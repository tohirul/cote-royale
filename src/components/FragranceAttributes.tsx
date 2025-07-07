import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

type AttributeData = {
  label: string;
  icon: IconType;
};

const SCENT_PROFILES: Record<
  Content.FragranceDocumentData["scent_profile"],
  AttributeData
> = {
  spicy: { label: "Spicy & Smoky", icon: LuFlame },
  woody: { label: "Woody & Herbal", icon: LuTreePine },
  fresh: { label: "Fresh & Aquatic", icon: LuDroplet },
};

const MOODS: Record<
  Exclude<Content.FragranceDocumentData["mood"], null>,
  AttributeData
> = {
  bold: { label: "Bold & Seductive", icon: LuCrown },
  grounded: { label: "Grounded & Sophisticated", icon: LuGem },
  refreshing: { label: "Refreshing & Invigorating", icon: LuZap },
};

type FragranceAttributeProps = {
  mood: Exclude<Content.FragranceDocumentData["mood"], null>;
  scentProfile: Content.FragranceDocumentData["scent_profile"];
  className: string;
};

export const FragranceAttributes = ({
  mood: providedMood,
  scentProfile: providedScentProfile,
  className,
}: FragranceAttributeProps) => {
  const scentProfile = SCENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];

  return (
    <div className={className}>
      <p className="mb-2 text-base font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <p className="flex items-center gap-4">
          <scentProfile.icon className="size-6" />
          {scentProfile.label}
        </p>
        <p className="flex items-center gap-4">
          <mood.icon className="size-6" />
          {mood.label}
        </p>
      </div>
    </div>
  );
};
