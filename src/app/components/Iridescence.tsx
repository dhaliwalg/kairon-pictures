'use client';
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
uniform float uMouseRadius; // New uniform for mouse interaction radius
uniform float uMouseStrength; // New uniform for mouse interaction strength

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Calculate mouse displacement
  vec2 mouseUV = (uMouse * 2.0 - 1.0) * uResolution.xy / mr; // Normalize mouse coordinates to match uv range
  vec2 diff = uv - mouseUV;
  float dist = length(diff);

  // Apply push-away effect
  float mouseEffect = max(0.0, 1.0 - dist / uMouseRadius);
  vec2 displacedUV = uv - normalize(diff) * mouseEffect * uMouseStrength;

  // Original iridescence effect applied to displacedUV
  // This line can be kept if you want a subtle overall shift based on mouse position,
  // in addition to the push-away. If you only want the push-away, consider removing or adjusting it.
  // displacedUV += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * displacedUV.x); // Use displacedUV
    d += sin(displacedUV.y * i + a); // Use displacedUV
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(displacedUV * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5); // Use displacedUV
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  mouseRadius?: number; // New prop
  mouseStrength?: number; // New prop
}

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  mouseRadius = 0.5, // Default value for mouse interaction radius
  mouseStrength = 0.1, // Default value for mouse interaction strength
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    // Change 'let program: Program;' to 'const program:'
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
            gl.canvas.width / gl.canvas.height
          ),
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
        uMouseRadius: { value: mouseRadius }, // Pass new uniform
        uMouseStrength: { value: mouseStrength }, // Pass new uniform
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program }); // geometry can also be const here.

    // Move the initial resize call after program and mesh are defined
    // so that program.uniforms.uResolution is set correctly on first render.
    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      // Ensure program exists before accessing its uniforms
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener("resize", resize, false);
    resize(); // Call resize after program is initialized

    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Invert y for typical WebGL/shader coordinates
      mousePos.current = { x, y };
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    }
    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed, amplitude, mouseReact, mouseRadius, mouseStrength]); // Add new props to dependency array

  return (
    <div
      ref={ctnDom}
      className="w-full h-full"
      {...rest}
    />
  );
}