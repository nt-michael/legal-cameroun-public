'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPAnimationOptions {
  trigger?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

export function useScrollTrigger<T extends HTMLElement>(
  callback: (element: T, gsapInstance: typeof gsap) => void,
  options: UseGSAPAnimationOptions = {}
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      callback(element, gsap);
    }, element);

    return () => ctx.revert();
  }, [callback]);

  return elementRef;
}

export function useStaggerAnimation<T extends HTMLElement>(
  selector: string,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    delay?: number;
  } = {}
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          y: options.y ?? 40,
          opacity: options.opacity ?? 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.6,
          stagger: options.stagger ?? 0.1,
          ease: options.ease ?? 'power2.out',
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, options.y, options.opacity, options.duration, options.stagger, options.ease, options.delay]);

  return containerRef;
}

export function useTimelineAnimation<T extends HTMLElement>(
  animationSequence: (tl: gsap.core.Timeline, element: T) => void
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      animationSequence(tl, element);
    }, element);

    return () => ctx.revert();
  }, [animationSequence]);

  return elementRef;
}

export function useCounterAnimation(
  targetValue: number,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
): { ref: RefObject<HTMLSpanElement | null>; value: number } {
  const elementRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(valueRef, {
        current: targetValue,
        duration: options.duration ?? 2,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (element) {
            element.textContent = Math.round(valueRef.current).toString();
          }
        },
      });
    }, element);

    return () => ctx.revert();
  }, [targetValue, options.duration, options.delay, options.ease]);

  return { ref: elementRef, value: valueRef.current };
}
