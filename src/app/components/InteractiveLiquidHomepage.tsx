'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Shaders ///////////////////////////////////////////////////////////////////

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 uv) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for (int i = 0; i < 4; i++) { // Keeping FBM iterations at 4 for softer patterns
      value += amplitude * snoise(uv * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse / u_resolution - 0.5;
    vec2 parallax_offset = vec2(mouse.x, -mouse.y) * 0.5;

    vec2 motion1 = vec2(u_time * 0.05, u_time * 0.02);
    float noise1 = fbm(uv + motion1 + parallax_offset);

    vec2 motion2 = vec2(u_time * -0.03, u_time * 0.08);
    float noise2 = fbm(uv * 1.5 + motion2 + parallax_offset);
    
    float distortion = fbm(uv + vec2(noise1, noise2) * 0.3) * 0.4;

    float epsilon = 0.01;
    vec3 normal = normalize(vec3(
      fbm(uv + vec2(epsilon, 0.0) + vec2(noise1, noise2) * 0.3) * 0.4 - distortion,
      fbm(uv + vec2(0.0, epsilon) + vec2(noise1, noise2) * 0.3) * 0.4 - distortion,
      epsilon * 1.5
    ));

    // --- Color Palette (ULTRA FINE-TUNED for KP Image) ---
    // Focus on very pastel, almost desaturated base colors.
    // Highlight colors carry the main iridescent shift.
    vec3 colorLightBlue = vec3(0.5, 0.8, 1.0);     // Base blue, slightly more pastel
    vec3 colorSoftPink = vec3(1.0, 0.75, 0.9);    // Gentle, soft pink
    vec3 colorPalePurple = vec3(0.7, 0.65, 0.95);  // Base light purple
    
    // These are less about broad areas and more about specific, subtle glints
    vec3 colorSubtleGreen = vec3(0.85, 0.95, 0.9); // Very light, almost desaturated green hint
    vec3 colorWarmPeach = vec3(1.0, 0.9, 0.8);     // Soft, warm peach/yellow hint

    // The highlight color is CRUCIAL for the iridescence, giving it a subtle cool shift
    vec3 highlightPearl = vec3(0.9, 0.92, 1.0);    // Bright, slightly blue/violet-tinted white highlight

    // --- Color Blending (Optimized for subtle shifts and high reflectivity) ---
    // Primary blend: Light Blue to Soft Pink, broad distribution.
    // Slightly wider smoothstep range for a softer, more diffused base.
    vec3 finalColor = mix(colorLightBlue, colorSoftPink, smoothstep(-0.6, 0.6, distortion));

    // Secondary blend: Introduce Pale Purple more prominently using normal.x.
    // This allows the purple to be a key shifting component across the surface.
    finalColor = mix(finalColor, colorPalePurple, smoothstep(-0.9, 0.9, normal.x)); 
    
    // Tertiary blend: Introduce subtle green, appearing only in narrow, bright bands.
    // Keeping this minimal as per the KP image's subtle green.
    finalColor = mix(finalColor, colorSubtleGreen, smoothstep(0.2, 0.6, normal.y)); 

    // Quaternary blend: Introduce warm peach/yellow as a very subtle, high-angle glint.
    // This makes it appear mostly on surfaces facing the viewer directly or at shallow angles.
    finalColor = mix(finalColor, colorWarmPeach, smoothstep(0.7, 0.95, normal.z)); 

    // --- Sheen & Shimmer ---
    // Pearlescent sheen calculated using the fresnel effect.
    float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 3.0);
    // Apply a VERY strong Fresnel highlight with the cool-tinted highlightPearl.
    // This creates the intense, shifty reflections.
    finalColor = mix(finalColor, highlightPearl, fresnel * 1.5); // Increased intensity even more

    // High-frequency shimmer (Your Method)
    float shimmer = snoise(uv * 20.0 + u_time * 2.0) * 0.1;
    finalColor += shimmer * 0.1; // Further reduced shimmer for extremely subtle sparkle

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// React Component ///////////////////////////////////////////////////////////
// No changes are needed in the React component.

const InteractiveLiquidBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const uniforms = useMemo(() => ({
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    uniforms.u_resolution.value.set(currentMount.clientWidth, currentMount.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
        uniforms.u_mouse.value.set(event.clientX, event.clientY);
    };

    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [uniforms]); 

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1, 
        overflow: 'hidden',
      }}
    />
  );
};

export default InteractiveLiquidBackground;