"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds an `inView` flag the first time the referenced element scrolls
 * into the viewport. Animations play once, then the element is unobserved.
 *
 * Usage:
 *   const { ref, inView } = useInView<HTMLElement>();
 *   <section ref={ref} className={inView ? styles.inView : ""}>
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target); // play once
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
