// "use client";
// import React, { useEffect, useRef } from "react";

// const Matrix: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const updateCanvasSize = () => {
//       const main = document.querySelector("main");
//       if (main) {
//         canvas.style.width = `${main.scrollWidth}px`;
//         canvas.style.height = `${main.scrollHeight}px`;
//         canvas.width = main.scrollWidth;
//         canvas.height = main.scrollHeight;
//       }
//     };

//     updateCanvasSize();

//     const columnWidth = 10; // Ширина символа
//     const numColumns = () => Math.ceil(canvas.width / columnWidth); // Количество столбцов для заполнения экрана
//     let yPositions: number[] = Array(numColumns()).fill(0);

//     const drawScreen = () => {
//       ctx.fillStyle = "rgba(0,0,0,.05)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#0f0";
//       yPositions.forEach((y, index) => {
//         const text = String.fromCharCode(1e2 + Math.random() * 33);
//         const x = index * columnWidth;
//         ctx.fillText(text, x, y);
//         if (y > canvas.height && Math.random() > 0.975) {
//           yPositions[index] = 0;
//         } else {
//           yPositions[index] = y + columnWidth;
//         }
//       });
//     };

//     const observer = new MutationObserver(mutationsList => {
//       for (let mutation of mutationsList) {
//         if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//           const firstTag = mutation.addedNodes[0] as HTMLElement;
//           if (firstTag.offsetHeight) {
//             updateCanvasSize();
//             yPositions = Array(numColumns()).fill(0); // Сброс yPositions в соответствии с новым количеством столбцов
//             drawScreen();
//             break;
//           }
//         }
//       }
//     });

//     observer.observe(document.querySelector("main")!, {
//       childList: true,
//       subtree: true,
//     });

//     const resizeObserver = new ResizeObserver(() => {
//       updateCanvasSize();
//       yPositions = Array(numColumns()).fill(0); // Сброс yPositions в соответствии с новым количеством столбцов
//       drawScreen();
//     });

//     resizeObserver.observe(document.querySelector("main")!);

//     const gameInterval = setInterval(drawScreen, 33);

//     window.addEventListener("resize", () => {
//       updateCanvasSize();
//       yPositions = Array(numColumns()).fill(0); // Сброс yPositions в соответствии с новым количеством столбцов
//       drawScreen();
//     });

//     return () => {
//       clearInterval(gameInterval);
//       observer.disconnect();
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", updateCanvasSize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: -1,
//       }}
//     ></canvas>
//   );
// };

// export default Matrix;

"use client";
import React, { useEffect, useRef } from "react";

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setInitialCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setInitialCanvasSize();

    const columnWidth = 10; // Ширина символа
    const numColumns = Math.ceil(canvas.width / columnWidth); // Количество столбцов для заполнения экрана
    let yPositions: number[] = Array(numColumns).fill(0);

    const drawScreen = () => {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    const gameInterval = setInterval(drawScreen, 33);

    window.addEventListener("resize", () => {
      // Только обновление ширины при изменении размера окна
      canvas.width = window.innerWidth;
      yPositions = Array(Math.ceil(canvas.width / columnWidth)).fill(0); // Сброс yPositions в соответствии с новым количеством столбцов
      drawScreen();
    });

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener("resize", setInitialCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></canvas>
  );
};

export default Matrix;

