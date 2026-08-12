"use client";

import React from "react";

interface GoldenTypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  loop?: boolean;
  waitDuration?: number;
}


export const GoldenTypewriter = ({
  text,
  className = "",
  delay = 0,
  speed = 0.08,
  loop = true,
  waitDuration = 3000,
}: GoldenTypewriterProps) => {
  void delay;
  void speed;
  void loop;
  void waitDuration;
  return <span className={`${className} inline-block leading-tight md:leading-tight`}>{text}</span>;
};
