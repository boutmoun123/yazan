import { readdir } from "node:fs/promises";
import path from "node:path";
import { withBasePath } from "@/lib/basePath";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif"
]);

const NUMBERED_IMAGE_PATTERN = /^(\d+)\.(jpg|jpeg|png|webp|avif)$/i;

function createAlt(name) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getWorkImages() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const entries = await readdir(imagesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .map((name) => {
      const extension = path.extname(name).toLowerCase();
      const match = name.match(NUMBERED_IMAGE_PATTERN);

      if (!IMAGE_EXTENSIONS.has(extension) || !match) {
        return null;
      }

      return {
        name,
        order: Number(match[1])
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.order - right.order)
    .map((name, index) => ({
      id: `${name.name}-${index}`,
      name: name.name,
      order: name.order,
      src: withBasePath(`/images/${name.name}`),
      alt: createAlt(name.name)
    }));
}
