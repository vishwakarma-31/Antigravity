"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveDressView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  const frameCount = 64;
  const currentFrame = (index: number) =>
    `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

  const images = useRef<HTMLImageElement[]>([]);
  const seq = useRef({ frame: 0 });

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesPreloaded(true);
        }
      };
      images.current.push(img);
    }
  }, []);

  useEffect(() => {
    if (!imagesPreloaded) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || images.current.length === 0) return;

    // Use dimensions matching the source frame to prevent ANY distortion. 
    // CSS 'object-cover' handles the responsive layout correctly!
    const firstFrame = images.current[0];
    canvas.width = firstFrame.width;
    canvas.height = firstFrame.height;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images.current[Math.round(seq.current.frame)];
      if (img) {
        context.drawImage(img, 0, 0);
      }
    };

    render();

    // We'll pin the ENTIRE product grid so the right panel stays still
    const tl = gsap.to(seq.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#interactive-pin-wrapper",
        start: "top 120px", 
        end: "+=2000", // The user will scroll 2000px to see the whole animation
        scrub: 0.5,
        pin: true,
      },
      onUpdate: render,
    });

    return () => {
      tl.kill();
      // Clean up the specific scroll trigger
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === "#interactive-pin-wrapper") {
          t.kill();
        }
      });
    };
  }, [imagesPreloaded]);

  return (
    <div ref={containerRef} className="w-full relative h-full">
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        {!imagesPreloaded && (
          <div className="absolute inset-0 flex items-center justify-center text-primary/70 glass z-10">
            <span className="animate-pulse font-medium tracking-widest uppercase text-sm">Loading Interactive View...</span>
          </div>
        )}
        {imagesPreloaded && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20">
              <div className="w-3 h-5 border border-white/60 rounded-full flex justify-center p-[2px]">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
              </div>
              <span className="text-xs uppercase tracking-wider text-white font-medium drop-shadow-md">Scroll to explore</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
