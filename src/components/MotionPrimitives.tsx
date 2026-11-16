import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.48, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStatValueProps {
  displayValue: string;
  numericTarget?: number;
  suffix?: string;
}

export function AnimatedStatValue({
  displayValue,
  numericTarget,
  suffix = '',
}: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [rendered, setRendered] = useState(displayValue);

  useEffect(() => {
    if (!inView || !numericTarget || prefersReduced) {
      setRendered(displayValue);
      return;
    }

    let frameId = 0;
    const duration = 700;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericTarget);
      setRendered(`${current.toLocaleString('en-IN')}${suffix}`);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setRendered(displayValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, numericTarget, suffix, displayValue, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {rendered}
    </span>
  );
}
