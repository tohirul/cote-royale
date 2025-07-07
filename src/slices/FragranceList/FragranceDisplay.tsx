import FadeIn from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { ButtonLink } from "@/components/ButtonLink";
import { HiPlus } from "react-icons/hi";
import { FragranceAttributes } from "@/components/FragranceAttributes";

type Props = {
  id: string;
};

export const FragranceDisplay = async ({ id }: Props) => {
  const client = createClient();
  const fragrance = await client.getByID<Content.FragranceDocument>(id);
  return (
    <FadeIn
      className="lg:p-20s relative z-10 grid min-h-[85vh] w-full translate-y-20 items-center justify-items-start border border-white/10 p-4 text-left md:p-14"
      vars={{ duration: 1 }}
      ease="expoScale(0.5,7,none)"
      start="top 50%"
    >
      <div className="absoulte inset-0 z-0">
        <PrismicNextImage
          field={fragrance.data.feature_image}
          alt=""
          className="object-center opacity-40 md:opacity-100"
          fill
          width={1150}
          quality={90}
        />
        {/* <PrismicNextLink field={fragrance.data.}>Link</PrismicNextLink> */}
        <FadeIn
          className="relative z-10 grid translate-y-8"
          vars={{
            duration: 1.2,
            delay: 0.5,
          }}
          ease="expoScale(0.5,7,none)"
          start="top 50%"
        >
          <h3 className="font-display mb-3 text-5xl md:text-6xl lg:text-7xl">
            <PrismicText field={fragrance.data.title} />
          </h3>
          <p className="mb-8">Eau de Parfum</p>
          <div className="mb-10 max-w-md text-lg text-gray-300">
            <PrismicRichText field={fragrance.data.description} />
          </div>
          <FragranceAttributes
            scentProfile={fragrance.data.scent_profile}
            mood={fragrance.data.mood ?? "bold"}
            className="mb-10"
          />
          <div className="flex flex-wrap gap-4">
            <ButtonLink document={fragrance} variant="Secondary">
              Discovery
            </ButtonLink>
            <ButtonLink href={"#"} variant="Primary">
              <HiPlus />
              &nbsp; <span>Add to bag</span>
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  );
};
