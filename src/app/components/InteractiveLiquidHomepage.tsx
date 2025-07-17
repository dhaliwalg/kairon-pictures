'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveLiquidBackgroundProps {
  hoveredProject?: { x: number; y: number } | null;
  mouseInfluence?: number;
}

const InteractiveLiquidBackground: React.FC<InteractiveLiquidBackgroundProps> = ({
  hoveredProject,
  mouseInfluence = 0.5
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);

  // Vertex shader for the liquid effect
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for vibrant holographic iridescent liquid effect
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseInfluence;
    uniform vec2 uResolution;
    uniform float uRevealRadius;
    uniform vec2 uRevealCenter;
    uniform float uRevealStrength;
    varying vec2 vUv;

    // Improved noise function
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(a, b, f.x) + (c - a) * f.y * (1.0 - f.x) + (d - b) * f.x * f.y;
    }

    // FBM for smooth flowing patterns
    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        
        for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
        }
        
        return value;
    }

    // HSV to RGB conversion for vibrant colors
    vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse / uResolution;
      
      float time = uTime * 0.4;
      
      // Create complex flowing liquid distortion
      vec2 flow1 = vec2(
        fbm(uv * 2.0 + time * 0.3),
        fbm(uv * 1.8 + time * 0.35)
      ) * 0.4;
      
      vec2 flow2 = vec2(
        fbm(uv * 3.5 + time * 0.2 + flow1),
        fbm(uv * 3.2 + time * 0.25 + flow1)
      ) * 0.3;
      
      vec2 flow3 = vec2(
        fbm(uv * 5.0 + time * 0.15 + flow2),
        fbm(uv * 4.8 + time * 0.18 + flow2)
      ) * 0.2;
      
      vec2 flowUv = uv + flow1 + flow2 + flow3;
      
      // Add large wave distortions for liquid movement
      flowUv += vec2(
        sin(uv.y * 4.0 + time * 0.6) * 0.15,
        cos(uv.x * 3.5 + time * 0.7) * 0.15
      );
      
      // Mouse influence with ripple effect
      float mouseDistance = distance(uv, mouse);
      float mouseEffect = 1.0 - smoothstep(0.0, 0.4, mouseDistance);
      mouseEffect = pow(mouseEffect, 1.2);
      
      // Create ripple patterns around mouse
      float ripple = sin(mouseDistance * 20.0 - time * 3.0) * mouseEffect * 0.1;
      flowUv += (uv - mouse) * mouseEffect * uMouseInfluence * 0.15;
      flowUv += ripple;
      
      // Create height/depth map for iridescent effect
      float height = fbm(flowUv * 3.0 + time * 0.1);
      height += fbm(flowUv * 6.0 + time * 0.15) * 0.5;
      height += fbm(flowUv * 12.0 + time * 0.2) * 0.25;
      height /= 1.75;
      
      // Calculate normal for realistic lighting
      float epsilon = 0.005;
      float heightX = fbm((flowUv + vec2(epsilon, 0.0)) * 3.0 + time * 0.1);
      float heightY = fbm((flowUv + vec2(0.0, epsilon)) * 3.0 + time * 0.1);
      vec2 normal = normalize(vec2(height - heightX, height - heightY));
      
      // Create iridescent hue based on surface normal and flow
      float hue = height * 0.5 + time * 0.1;
      hue += normal.x * 0.3 + normal.y * 0.2;
      hue += sin(flowUv.x * 6.0 + time * 0.3) * 0.2;
      hue += cos(flowUv.y * 5.0 + time * 0.25) * 0.2;
      
      // Add flowing color waves
      hue += sin(flowUv.x * 8.0 + flowUv.y * 6.0 + time * 0.5) * 0.3;
      hue += cos(flowUv.x * 4.0 - flowUv.y * 7.0 + time * 0.4) * 0.2;
      
      // Normalize hue to 0-1 range
      hue = fract(hue);
      
      // Create vibrant holographic colors
      float saturation = 0.8 + sin(height * 10.0 + time * 0.2) * 0.2;
      saturation = clamp(saturation, 0.6, 1.0);
      
      float brightness = 0.7 + height * 0.3;
      brightness += pow(max(0.0, normal.x + normal.y), 2.0) * 0.3;
      brightness = clamp(brightness, 0.4, 1.0);
      
      // Convert HSV to RGB for base iridescent color
      vec3 iridescent = hsv2rgb(vec3(hue, saturation, brightness));
      
      // Add metallic highlights
      float metallic = pow(max(0.0, height + normal.x * 0.5), 4.0);
      vec3 metalHighlight = vec3(1.0, 0.95, 0.9) * metallic * 0.6;
      
      // Add prismatic reflections (rainbow effect)
      float prism = pow(max(0.0, 1.0 - abs(normal.x - normal.y)), 8.0);
      vec3 prismColor = hsv2rgb(vec3(hue + 0.3, 0.9, 0.8)) * prism * 0.4;
      
      // Add oil slick effect
      float oilSlick = sin(height * 15.0 + time * 0.3) * 0.5 + 0.5;
      vec3 oilColor = hsv2rgb(vec3(hue + oilSlick * 0.2, 0.7, 0.6)) * oilSlick * 0.3;
      
      // Combine all color effects
      vec3 finalColor = iridescent + metalHighlight + prismColor + oilColor;
      
      // Add depth-based color shifts
      float depthShift = smoothstep(0.2, 0.8, height);
      finalColor = mix(finalColor, finalColor * vec3(1.1, 0.9, 1.2), depthShift * 0.3);
      
      // Add fine shimmer detail
      float shimmer = sin(flowUv.x * 80.0 + time * 3.0) * 
                     sin(flowUv.y * 60.0 + time * 2.5) * 0.05 + 0.95;
      finalColor *= shimmer;
      
      // Add flowing color streaks
      float streak = sin(flowUv.x * 20.0 + flowUv.y * 15.0 + time * 1.0) * 0.1 + 0.9;
      finalColor *= streak;
      
      // Enhance vibrancy
      finalColor = pow(finalColor, vec3(0.9)); // Increase gamma for more vibrant colors
      finalColor *= 1.2; // Boost overall brightness
      
      // Add subtle color temperature variation
      float warmth = sin(time * 0.1 + height * 2.0) * 0.1 + 0.9;
      finalColor *= vec3(warmth, 1.0, 1.0 / warmth);
      
      // Ensure colors stay within bounds but allow for overbrightness
      finalColor = clamp(finalColor, 0.0, 1.5);
      
      // Reveal effect for project areas
      float revealDistance = distance(uv, uRevealCenter);
      float reveal = 1.0 - smoothstep(0.0, uRevealRadius, revealDistance);
      reveal *= uRevealStrength;
      
      // Create dissolve effect with more organic patterns
      float dissolve = fbm(uv * 10.0 + uTime * 0.5) * 0.5 + 0.5;
      dissolve += fbm(uv * 20.0 + uTime * 0.3) * 0.3;
      reveal *= smoothstep(0.4, 0.8, dissolve);
      
      // Mix between liquid and transparent for reveal
      finalColor = mix(finalColor, vec3(0.0), reveal);
      float alpha = mix(1.0, 0.0, reveal);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  useEffect(() => {
    if (!mountRef.current) return;

    console.log('Initializing Three.js scene...');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Clear previous canvas
    if (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Check WebGL support
    if (!renderer.getContext()) {
      console.error('WebGL not supported');
      return;
    }

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseInfluence: { value: mouseInfluence },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uRevealRadius: { value: 0.0 },
        uRevealCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uRevealStrength: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Check for shader compilation errors
    material.needsUpdate = true;
    
    // Add error handling
    const handleError = (event: any) => {
      console.error('Shader compilation error:', event);
    };
    
    renderer.domElement.addEventListener('webglcontextlost', handleError);

    materialRef.current = material;

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    console.log('Scene objects:', scene.children.length);
    console.log('Material uniforms:', material.uniforms);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (material.uniforms.uTime) {
        material.uniforms.uTime.value += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (material.uniforms.uResolution) {
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      if (materialRef.current && materialRef.current.uniforms.uMouse) {
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - (e.clientY / window.innerHeight);
        materialRef.current.uniforms.uMouse.value.set(x, y);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial render to test
    renderer.render(scene, camera);
    console.log('Initial render complete');

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('webglcontextlost', handleError);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        if (mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [mouseInfluence]);

  // Handle project hover reveal effect
  useEffect(() => {
    if (!materialRef.current) return;

    if (hoveredProject) {
      if (materialRef.current.uniforms.uRevealCenter &&
          materialRef.current.uniforms.uRevealRadius &&
          materialRef.current.uniforms.uRevealStrength) {
        materialRef.current.uniforms.uRevealCenter.value.set(
          hoveredProject.x / window.innerWidth,
          1 - (hoveredProject.y / window.innerHeight)
        );
        materialRef.current.uniforms.uRevealRadius.value = 0.2;
        materialRef.current.uniforms.uRevealStrength.value = 0.8;
      }
    } else {
      if (materialRef.current.uniforms.uRevealRadius &&
          materialRef.current.uniforms.uRevealStrength) {
        materialRef.current.uniforms.uRevealRadius.value = 0.0;
        materialRef.current.uniforms.uRevealStrength.value = 0.0;
      }
    }
  }, [hoveredProject]);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div className="absolute top-4 left-4 text-white z-10">
        <p>Holographic Liquid Background</p>
        <p>Move your mouse to see interaction</p>
      </div>
    </div>
  );
};

export default InteractiveLiquidBackground;