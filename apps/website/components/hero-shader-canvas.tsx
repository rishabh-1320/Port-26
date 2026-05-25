"use client";

import { useEffect, useRef } from "react";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "@/lib/shaders/hero-gradient.glsl";

// Exact config from the original Framer "Animated Gradient Background" component
const CONFIG = {
  color1: [166 / 255, 219 / 255, 70 / 255, 1] as const,   // #a6db46
  color2: [187 / 255, 244 / 255, 81 / 255, 1] as const,   // #bbf451
  color3: [1, 1, 1, 1] as const,                           // #ffffff
  shape: 0,             // Checks
  proportion: 0.35,     // 35/100
  scale: 1.0,
  softness: 1.0,        // 100/100
  rotation: 0,
  distortion: 0.12,     // 12/100
  swirl: 0.80,          // 80/100
  swirlIterations: 10,
  shapeScale: 0.10,     // shapeSize 10/100
  speed: 40,
} as const;

const FPS_CAP = 30;
const RENDER_SCALE = 0.5;

export function HeroShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) {
      canvas.classList.add("hero-shader-fallback");
      return;
    }

    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full-screen quad: two triangles
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTime        = gl.getUniformLocation(program, "u_time");
    const uPixelRatio  = gl.getUniformLocation(program, "u_pixelRatio");
    const uResolution  = gl.getUniformLocation(program, "u_resolution");
    const uScale       = gl.getUniformLocation(program, "u_scale");
    const uRotation    = gl.getUniformLocation(program, "u_rotation");
    const uColor1      = gl.getUniformLocation(program, "u_color1");
    const uColor2      = gl.getUniformLocation(program, "u_color2");
    const uColor3      = gl.getUniformLocation(program, "u_color3");
    const uProportion  = gl.getUniformLocation(program, "u_proportion");
    const uSoftness    = gl.getUniformLocation(program, "u_softness");
    const uShape       = gl.getUniformLocation(program, "u_shape");
    const uShapeScale  = gl.getUniformLocation(program, "u_shapeScale");
    const uDistortion  = gl.getUniformLocation(program, "u_distortion");
    const uSwirl       = gl.getUniformLocation(program, "u_swirl");
    const uSwirlIter   = gl.getUniformLocation(program, "u_swirlIterations");

    // Static uniforms (never change)
    gl.uniform4fv(uColor1, CONFIG.color1);
    gl.uniform4fv(uColor2, CONFIG.color2);
    gl.uniform4fv(uColor3, CONFIG.color3);
    gl.uniform1f(uScale, CONFIG.scale);
    gl.uniform1f(uRotation, CONFIG.rotation);
    gl.uniform1f(uProportion, CONFIG.proportion);
    gl.uniform1f(uSoftness, CONFIG.softness);
    gl.uniform1f(uShape, CONFIG.shape);
    gl.uniform1f(uShapeScale, CONFIG.shapeScale);
    gl.uniform1f(uDistortion, CONFIG.distortion);
    gl.uniform1f(uSwirl, CONFIG.swirl);
    gl.uniform1f(uSwirlIter, CONFIG.swirlIterations);

    let raf = 0;
    let lastTick = 0;
    let totalTime = 0;
    let isRunning = false;
    let isVisible = true;
    const frameInterval = 1000 / FPS_CAP;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr * RENDER_SCALE);
      const h = Math.round(canvas.clientHeight * dpr * RENDER_SCALE);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const renderFrame = (delta: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(uPixelRatio, dpr * RENDER_SCALE);
      gl.uniform1f(uTime, totalTime * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      // Framer normalizes speed to 0–1 range before multiplying delta
      totalTime += delta * (CONFIG.speed / 100);
    };

    const loop = (now: number) => {
      if (!isRunning) return;
      const delta = now - lastTick;
      if (delta < frameInterval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastTick = now;
      renderFrame(delta);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || isRunning || !isVisible) return;
      isRunning = true;
      lastTick = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(raf);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop();
      else if (isVisible) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    if (reduceMotion) {
      renderFrame(0);
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-shader-canvas" aria-hidden="true" />;
}
