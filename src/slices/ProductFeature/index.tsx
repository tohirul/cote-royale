import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import FadeIn from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";
import { ButtonLink } from "@/components/ButtonLink";

/**
 * Props for `ProductFeature`.
 */
export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

/**
 * Component for "ProductFeature" Slices.
 */
const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {
  const client = createClient();
  const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
    ? await client.getByID<Content.FragranceDocument>(
        slice.primary.fragrance.id,
      )
    : null;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto,auto]">
        <FadeIn
          className="translate-y-16 opacity-0 lg:col-span-2 lg:row-span-2"
          vars={{ duration: 0.5 }}
        >
          <PrismicNextImage field={slice.primary.image} />
        </FadeIn>
        <FadeIn className="translate-y-16 space-y-6 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1">
          <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
          <div className="max-w-lg text-base text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </FadeIn>
        {/* <PrismicNextLink field={slice.primary.fragrance}>Link</PrismicNextLink> */}
        {/* Fregrance */}
        <FadeIn
          className="animate-in relative translate-y-16 self-end bg-white/10 opacity-0 will-change-transform"
          vars={{ duration: 1, delay: 0.5 }}
          start="top 90%"
        >
          <PrismicNextImage
            field={fragrance?.data?.bottle_image}
            className="mx-auto -mt-10 w-full -rotate-12 md:-mt-20"
          />
          <div className="flex justify-between p-10 pt-4">
            <div className="space-y-1">
              <h3 className="font-display text-4xl">
                <PrismicText
                  field={fragrance?.data?.title}
                  fallback="Fragrance"
                />
              </h3>
              <p className="mt-2 text-gray-400">Eau de Parfum</p>
              <ButtonLink
                document={fragrance}
                variant="Secondary"
                className="mt-6 uppercase"
              >
                shop now
              </ButtonLink>
            </div>
            <p className="mt-4 text-gray-400" aria-label="Product Price">
              <span>{formatPrice(fragrance?.data?.price)}</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default ProductFeature;
