import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { defineCollection } from "astro:content";

export const collections = {
  images: defineCollection({
    loader: cldAssetsLoader({
      folder: "archive/images",
      limit: 500,
      metadata: true,
      resourceType: "image",
    }),
  }),
  videos: defineCollection({
    loader: cldAssetsLoader({
      folder: "archive/videos",
      limit: 500,
      metadata: true,
      resourceType: "video",
    }),
  }),
};
