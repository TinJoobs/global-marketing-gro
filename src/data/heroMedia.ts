import { HERO_IMG, industryShowcase } from "@/pages/home/homeData";

export type HeroSlide = { src: string; position?: string };

export const heroVideo: { src: string; poster: string } | null = null;

export const heroSlides: HeroSlide[] = [
  { src: HERO_IMG, position: "50% 40%" },
  ...industryShowcase.slice(0, 4).map((item) => ({
    src: item.image,
    position: "50% 45%",
  })),
];

export const storyPhotos: string[] = [
  industryShowcase[0].image,
  industryShowcase[3].image,
  HERO_IMG,
];
