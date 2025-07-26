"use client";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive; // New uniform to track if mouse is active

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Calculate mouse displacement
  vec2 mouseUV = (uMouse * 2.0 - 1.0) * uResolution.xy / mr;
  vec2 diff = uv - mouseUV;
  float dist = length(diff);

  // Improved falloff with smoother feathering and expanded area
  float normalizedDist = dist / uMouseRadius;
  
  // Use smoothstep for feathered edges and expand the effective area
  float mouseEffect = smoothstep(1.2, 0.0, normalizedDist) * uMouseActive; // Use uMouseActive here
  
  // Reduce the pinching effect in the center by using a softer curve
  float centerSoftening = mix(0.3, 1.0, smoothstep(0.0, 0.4, normalizedDist));
  mouseEffect *= centerSoftening;

  vec2 displacedUV = uv - normalize(diff) * mouseEffect * uMouseStrength;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * displacedUV.x);
    d += sin(displacedUV.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(displacedUV * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  mouseRadius?: number;
  mouseStrength?: number;
}

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  mouseRadius = 0.7, // Increased default radius for larger area
  mouseStrength = 0.08, // Slightly reduced strength to compensate for larger area
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0); // Target value for uMouseActive
  const currentMouseActive = useRef(0.0); // Current animated value

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const program: Program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ),
        },
        uMouse: {
          value: new Float32Array([mousePos.current.x, mousePos.current.y]),
        },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
        uMouseRadius: { value: mouseRadius },
        uMouseStrength: { value: mouseStrength },
        uMouseActive: { value: 0.0 }, // Initialize as inactive
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        );
      }
    }
    window.addEventListener("resize", resize, false);
    resize();

    let animateId: number;
    let lastTime = 0;
    const fadeSpeed = 0.05; // Adjust this value for faster/slower fade

    function update(t: number) {
      animateId = requestAnimationFrame(update);

      // Calculate delta time for consistent animation speed
      const deltaTime = t - lastTime;
      lastTime = t;

      // Smoothly interpolate currentMouseActive towards targetMouseActive
      currentMouseActive.current +=
        (targetMouseActive.current - currentMouseActive.current) *
        fadeSpeed *
        (deltaTime / 16.66); // Divide by ~16.66ms (1000/60) for frame-rate independent easing

      // Clamp the value to ensure it stays between 0 and 1
      currentMouseActive.current = Math.max(
        0.0,
        Math.min(1.0, currentMouseActive.current),
      );

      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouseActive.value = currentMouseActive.current; // Use the animated value
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;

      // Set target to active
      targetMouseActive.current = 1.0;
    }

    function handleMouseEnter() {
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
      ctn.addEventListener("mouseenter", handleMouseEnter);
      ctn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
        ctn.removeEventListener("mouseenter", handleMouseEnter);
        ctn.removeEventListener("mouseleave", handleMouseLeave);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed, amplitude, mouseReact, mouseRadius, mouseStrength]);

  return <div ref={ctnDom} className="w-full h-full" {...rest} />;
}
