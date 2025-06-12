"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  children?: React.ReactNode;
  className?: string;
  vars?: Record<string, unknown>;
};

function FadeIn({ children, className = "", vars = {} }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(containerRef.current, {
          scale: 1,
          duration: 4,
          opacity: 1,
          ease: "power3.out",
          y: 0,
          ...vars,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(containerRef.current, {
          scale: 1,
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
}

export default FadeIn;
