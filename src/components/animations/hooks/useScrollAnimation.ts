"use client";

import type { Variants, Transition, Easing } from "@/compat/motion";

export type AnimationDirection = "up" | "down" | "left" | "right";

interface UseScrollAnimationOptions {
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  margin?: string;
  ease?: Easing;
}

interface ScrollAnimationResult {
  initial: Variants["hidden"];
  whileInView: Variants["visible"];
  viewport: { once: boolean; margin: string };
  transition: Transition;
}

const EASE_OUT: Easing = [0.25, 0.46, 0.45, 0.94];

export function useScrollAnimation(options: UseScrollAnimationOptions = {}): ScrollAnimationResult {
  const {
    direction = "up",
    duration = 0.6,
    delay = 0,
    margin = "-50px",
    ease = EASE_OUT,
  } = options;

  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40 };
      case "down":
        return { y: -40 };
      case "left":
        return { x: 50 };
      case "right":
        return { x: -50 };
      default:
        return { y: 40 };
    }
  };

  const getVisibleState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0 };
      case "left":
      case "right":
        return { x: 0 };
      default:
        return { y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffset(),
  };

  const whileInView = {
    opacity: 1,
    ...getVisibleState(),
  };

  const transition: Transition = {
    duration,
    delay,
    ease,
  };

  return {
    initial,
    whileInView,
    viewport: { once: true, margin },
    transition,
  };
}

export function useFadeUp(delay = 0, margin = "-50px") {
  return useScrollAnimation({ direction: "up", delay, margin });
}

export function useSlideIn(
  direction: "left" | "right" = "right",
  delay = 0,
  margin = "-50px"
) {
  return useScrollAnimation({ direction, delay, margin });
}

export function useScaleIn(delay = 0, margin = "-50px") {
  const initial = { opacity: 0, scale: 0.9 };
  const whileInView = { opacity: 1, scale: 1 };
  const transition: Transition = { duration: 0.6, delay, ease: EASE_OUT };

  return {
    initial,
    whileInView,
    viewport: { once: true, margin },
    transition,
  };
}

export function useStaggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function useStaggerItem() {
  return {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: EASE_OUT as Easing,
      },
    },
  };
}
