import {
  Factory,
  Building2,
  Wrench,
  Car,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import type { ArtKey, CategorySlug } from "@/types";

/** آیکون هر دسته/طرح تصویر. */
export const artIcon: Record<ArtKey, LucideIcon> = {
  industrial: Factory,
  construction: Building2,
  general: Wrench,
  "automotive-adhesive": Car,
  "car-care": SprayCan,
};

/** رنگ گرادیان هر طرح — همه در خانواده آبی فولادی، با شیفت‌های ملایم. */
export const artGradient: Record<ArtKey, { from: string; to: string; ink: string }> = {
  industrial: { from: "#e8eff5", to: "#cdddea", ink: "#3f6389" },
  construction: { from: "#eaf0f4", to: "#d3dde4", ink: "#4a6070" },
  general: { from: "#ecf2f8", to: "#d7e3ee", ink: "#356094" },
  "automotive-adhesive": { from: "#e7edf3", to: "#ccd8e2", ink: "#33465a" },
  "car-care": { from: "#e8f1f2", to: "#d0e2e2", ink: "#2f6a63" },
};

export const categoryArtKey = (slug: CategorySlug): ArtKey => slug;
