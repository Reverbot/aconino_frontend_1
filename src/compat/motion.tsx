import {
  Fragment,
  createElement,
  forwardRef,
  type PropsWithChildren,
} from "react";

// Compatibilidad temporal para conservar el marcado original sin cargar un
// motor de animaciones. Las transiciones visuales quedan a cargo de CSS.
const animationOnlyProps = new Set([
  "animate",
  "custom",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "onAnimationComplete",
  "onUpdate",
  "transformTemplate",
  "transition",
  "variants",
  "viewport",
  "whileDrag",
  "whileFocus",
  "whileHover",
  "whileInView",
  "whileTap",
  "while this",
]);

function createStaticElement(tag: string) {
  return forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
    const cleanProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !animationOnlyProps.has(key)),
    );

    return createElement(tag, { ...cleanProps, ref });
  });
}

const staticMotion = new Proxy(
  {},
  {
    get: (_target, tag: string) => createStaticElement(tag),
  },
) as Record<string, ReturnType<typeof createStaticElement>>;

export const motion = staticMotion;
export const m = staticMotion;

export function AnimatePresence({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}

export function LazyMotion({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}

export const domAnimation = {};

export type Variants = Record<string, unknown>;
export type Transition = Record<string, unknown>;
export type Easing = string | number[];
