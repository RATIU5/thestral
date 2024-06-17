type PathItem = {
  id: number;
  slug: string;
  parentId: number | null;
};

type FullPathItem = {
  id: number;
  path: string;
};

export function generateFullPaths(
  paths: PathItem[],
  parentId: number | null = null,
  parentPath: string = ""
): FullPathItem[] {
  const fullPaths: FullPathItem[] = [];

  for (const path of paths) {
    if (path.parentId === parentId) {
      const fullPath = parentPath ? `${parentPath}/${path.slug}` : path.slug;
      fullPaths.push({ id: path.id, path: fullPath });

      const childPaths = generateFullPaths(paths, path.id, fullPath);
      fullPaths.push(...childPaths);
    }
  }

  return fullPaths;
}

/**
 * Transform a slug string to a valid slug
 * @param slug the slug string to transform
 * @returns the transformed slug
 * @throws an error if the slug is invalid or empty
 */
export function transformSlug(slug: string) {
  const newSlug = slug.trim().replace(/\s+/g, "-").toLowerCase();
  if (newSlug === "") {
    throw new Error("Slug cannot be empty");
  }
  // Slug can only contain lowercase alphanumeric characters and hyphens
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug) === false) {
    throw new Error(
      "Slug can only contain lowercase alphanumeric characters and hyphens"
    );
  }
  return newSlug;
}
