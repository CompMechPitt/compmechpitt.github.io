import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    theme: z.string(),
    methods: z.array(z.string()),
    publications: z.array(z.string()),
    figures: z
      .array(
        z.object({ src: z.string(), alt: z.string(), caption: z.string() }),
      )
      .default([]),
    videos: z
      .array(
        z.object({ src: z.string(), title: z.string(), captions: z.string() }),
      )
      .default([]),
  }),
});
export const collections = { projects };
