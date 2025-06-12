import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

/**
 * Component for "ScrollText" Slices.
 */
const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const words = asText(slice.primary.text).split(" ");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-screen items-center justify-center bg-neutral-950"
    >
      <div className="glow-background --opacity-0 absolute inset-0 z-0 h-full w-full"></div>
      <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply"></div>
      <div>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          <span>{slice.primary.eyebrow}</span>
        </div>
      </div>

      {/* <PrismicRichText field={slice.primary.text} /> */}
      <div className="text-center">
        <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase md:text-7xl">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="inline">
              {word.split("").map((char, charIndex) => (
                <span key={`${char}-${charIndex}`} className="inline">
                  {char}
                </span>
              ))}
              {index < words.length - 1 ? (
                <span className="inline">&nbsp;</span>
              ) : null}
            </span>
          ))}
        </p>
      </div>
    </Bounded>
  );
};

export default ScrollText;
