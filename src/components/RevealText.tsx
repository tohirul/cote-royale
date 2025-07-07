"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

type Props = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  delay?: number;
  duration?: number;
  ease?: string;
  vars?: Record<string, unknown>;
  align?: "start" | "center" | "end";
  triggerStart?: string;
  triggerEnd?: string;
};

export const RevealText = ({
  field,
  id,
  className = "",
  staggerAmount = 0.1,
  as: Component = "div",
  delay = 0,
  duration = 1,
  ease = "power3.out",
  vars = {},
  align = "start",
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
}: Props) => {
  const words = asText(field).split(" ");

  const componentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          delay,
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: ease,
          scrollTrigger: {
            trigger: componentRef.current,
            start: triggerStart,
            end: triggerEnd,
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          delay,
          duration,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
          ...vars,
        });
      });
    },
    { scope: componentRef },
  );

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center"
          ? "text-center"
          : align === "end"
            ? "text-end"
            : "text-start",
        className,
      )}
      id={id}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${id}-${index}`}
          className={clsx("mb-0 inline-block overflow-hidden pb-4")}
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
            {index < words?.length - 1 ? <>&nbsp;</> : null}
          </span>
        </span>
      ))}
    </Component>
  );
};
