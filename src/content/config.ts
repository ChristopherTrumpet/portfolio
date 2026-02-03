import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { defineCollection } from "astro:content";

export const collections = {
  assets: defineCollection({
    loader: cldAssetsLoader({
      limit: 20,
      metadata: true,
    }),
  }),
};
