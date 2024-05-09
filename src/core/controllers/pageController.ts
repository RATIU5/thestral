import sql from "../utils/dbConnection";

/**
 * Create a new page and store it in the database
 * @param param The config object
 * @returns whether the page was created successfully or not
 */
export async function createPage({
  slug,
  parentId,
}: {
  slug: string;
  parentId: number | null;
}): Promise<boolean> {
  let status = false;
  if (slug.trim() === "") {
    console.log("Slug is required");
    return status;
  }

  try {
    // Cannot have duplicate slugs for the same parent
    let existingPages;
    if (parentId !== null) {
      existingPages =
        await sql`SELECT id FROM page WHERE slug = ${slug} AND parent_id = ${parentId}`;
    } else {
      existingPages =
        await sql`SELECT id FROM page WHERE slug = ${slug} AND parent_id IS NULL`;
    }
    if (existingPages.length > 0) {
      throw new Error("Page with the same slug already exists");
    }

    // Insert the page finally
    await sql`INSERT INTO page (slug, parent_id, status, created_at, updated_at) VALUES (${slug}, ${parentId}, 'draft', to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0))`;
    status = true;
  } catch (e) {
    console.error(e);
  }

  return status;
}

export async function getExistingPages() {
  const res = await sql`SELECT id, slug, parent_id FROM page`;
  return res.map((page) => ({
    id: page.id,
    parentId: page.parent_id,
    slug: page.slug,
  }));
}

export async function deletePage(id: number) {
  let status = false;
  try {
    const children = await sql`SELECT id FROM page WHERE parent_id = ${id}`;
    if (children.length > 0) {
      throw new Error("Cannot delete a page with children");
    }
    await sql`DELETE FROM page WHERE id = ${id}`;
    status = true;
  } catch (e) {
    console.error(e);
  }
  return status;
}
