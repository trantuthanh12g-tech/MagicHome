import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  target: number;
  /** Where the counter starts counting from (default 0) */
  min?: number;
  suffix?: string;
  prefix?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Format large numbers with locale separator (e.g. 1,800) */
  separator?: boolean;
}

export function AnimatedCounter({
  target,
  min = 0,
  suffix = "",
  prefix = "",
  duration = 2200,
  separator = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(min);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const range = target - min;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(min + Math.round(eased * range));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, min, duration]);

  const display = separator ? count.toLocaleString() : String(count);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
