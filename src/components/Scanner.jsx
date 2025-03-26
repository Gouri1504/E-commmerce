import React, { useEffect } from "react";
import config from "./config.json"; // Make sure this config is correct!
import Quagga from "quagga";

const Scanner = props => {
  const { onDetected } = props;

  useEffect(() => {
    // Initialize QuaggaJS
    Quagga.init(config, err => {
      if (err) {
        console.error("Quagga initialization error:", err);
        return; // Important: Exit if initialization fails
      }
      console.log("Quagga initialised successfully. Starting...");
      Quagga.start();
    });

    // Cleanup function: Stop Quagga when the component unmounts
    return () => {
      console.log("Stopping Quagga...");
      Quagga.stop();
    };
  }, []); // Empty dependency array: This effect runs only once on mount and unmount


  useEffect(() => {

    //detecting boxes on stream
    Quagga.onProcessed(result => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("width")) //Corrected to width
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

  }, []);  // This useEffect depends on no external variables, so it runs only once

  useEffect(() => {
    const detected = result => {
      onDetected(result.codeResult.code);
    };
    Quagga.onDetected(detected);

    return () => {
      Quagga.offDetected(detected);  // Clean up the event listener
    }
  }, [onDetected]); // This useEffect depends on `onDetected` prop.



  return (
    <div id="interactive" className="viewport relative w-full h-60 border border-gray-00 rounded-md overflow-hidden">
      {/*  Additional content or styling can be added here if needed */}
    </div>
  );
};

export default Scanner;