import { useState, useRef, useCallback } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label?: string;
}

export function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-md select-none group" style={{ aspectRatio: "4/3" }}>
      {/* Wrapper captures pointer events on whole area */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-ew-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        {/* After image — full background */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Before image — clipped to left side */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle circle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
          >
            {/* Double arrow icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l-6-6 6-6" />
              <path d="M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/55 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md pointer-events-none font-medium">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-amber-500/80 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md pointer-events-none font-medium">
          After
        </div>
      </div>

      {/* Bottom label */}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 pointer-events-none">
          <p className="text-white/80 text-xs text-center">{label}</p>
        </div>
      )}
    </div>
  );
}