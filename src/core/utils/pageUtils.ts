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
