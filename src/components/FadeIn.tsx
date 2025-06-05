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
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 5,
        opacity: 1,
        ease: "power3.out",
        y: 0,
        ...vars,
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
