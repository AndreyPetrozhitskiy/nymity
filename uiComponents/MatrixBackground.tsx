"use client";
import React, { useEffect, useRef } from "react";

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const firstChild = main.firstChild as HTMLElement | null;
      if (!firstChild) return;

      canvas.width = window.innerWidth;
      canvas.height = firstChild.offsetHeight;
    };

    const w = canvas.width = window.innerWidth;
    updateCanvasSize();

    const columnWidth = 10; // Ширина символа
    const numRows = Math.ceil(canvas.height / columnWidth); // Количество строк для заполнения экрана
    const yPositions: number[] = Array(numRows).fill(0);

    const drawScreen = () => {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, w, canvas.height);
      ctx.fillStyle = "#0f0";
      yPositions.forEach((y, index) => {
        const text = String.fromCharCode(1e2 + Math.random() * 33);
        const x = index * columnWidth;
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + columnWidth;
        }
      });
    };

    const observer = new MutationObserver(mutationsList => {
      for(let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const firstTag = mutation.addedNodes[0] as HTMLElement;
          if (firstTag.offsetHeight) {
            updateCanvasSize();
            drawScreen();
            break;
          }
        }
      }
    });

    observer.observe(document.querySelector("main")!, {
      childList: true,
    });

    const gameInterval = setInterval(drawScreen, 33);

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      clearInterval(gameInterval);
      observer.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: -1,
      }}
    ></canvas>
  );
};

export default Matrix;