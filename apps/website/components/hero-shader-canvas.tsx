"use client";

import { useEffect, useRef } from "react";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "@/lib/shaders/hero-gradient.glsl";

const FPS_CAP = 30;
const RENDER_SCALE = 0.5;

const COLOR_LIME = [187 / 255, 244 / 255, 81 / 255] as const;
const COLOR_BLUE = [79 / 255, 161 / 255, 255 / 255] as const;
const COLOR_WARM = [255 / 255, 248 / 255, 154 / 255] as const;

export function HeroShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
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

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uColorLime = gl.getUniformLocation(program, "u_color_lime");
    const uColorBlue = gl.getUniformLocation(program, "u_color_blue");
    const uColorWarm = gl.getUniformLocation(program, "u_color_warm");

    gl.uniform3fv(uColorLime, COLOR_LIME);
    gl.uniform3fv(uColorBlue, COLOR_BLUE);
    gl.uniform3fv(uColorWarm, COLOR_WARM);

    let raf = 0;
    let lastTick = 0;
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
        gl.uniform2f(uResolution, w, h);
      }
    };

    const renderFrame = (time: number) => {
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (time: number) => {
      if (!isRunning) return;
      if (time - lastTick < frameInterval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastTick = time;
      renderFrame(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || isRunning || !isVisible) return;
      isRunning = true;
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
