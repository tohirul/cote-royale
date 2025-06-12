import { FC } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import FadeIn from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="bg-image absolute inset-0 scale-125 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover"
        />
      </FadeIn>
      <div className="relative flex h-screen flex-col justify-center">
        <RevealText
          field={slice.primary.heading}
          id={`hero-heading`}
          duration={1.5}
          staggerAmount={0.2}
          as={"h1"}
          ease="sign.out"
          className="font-display max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
        ></RevealText>
        <FadeIn
          vars={{ delay: 0.9, duration: 0.9, ease: "sine.out" }}
          className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <FadeIn
          className="mt-8 translate-y-5"
          vars={{ delay: 1.8, duration: 0.9, ease: "sine.out" }}
        >
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "bg-white text-black hover:bg-white/80",
                "w-fit",
              )}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
