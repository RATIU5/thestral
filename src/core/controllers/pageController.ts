import sql from "../utils/dbConnection";

// TODO: Replace generic Errors with custom errors

/**
 * Get the id, slug, and parent_id for all the pages
 * @returns an array of all the pages
 */
export async function getExistingPages() {
  const res = await sql`SELECT id, slug, parent_id FROM page`;
  return res.map((page) => ({
    id: page.id,
    parentId: page.parent_id,
    slug: page.slug,
  }));
}

/**
 * Create a new page and store it in the database
 * @param param The config object
 * @returns whether the page was created successfully or not
 * @throws an error if the slug is empty, contains invalid characters, or already exists
 */
export async function createPage({
  slug,
  parentId,
}: {
  slug: string;
  parentId: number | null;
}): Promise<boolean> {
  let status = false;
  try {
    if (slug.trim() === "") {
      throw new Error("Slug cannot be empty");
    }

    // Convert the slug to lowercase and replace spaces with hyphens
    slug = slug.trim().replace(/\s+/g, "-").toLowerCase();

    // Slug can only contain lowercase alphanumeric characters and hyphens
    if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) === false) {
      throw new Error(
        "Slug can only contain lowercase alphanumeric characters and hyphens"
      );
    }

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

export type PageColumns = {
  id: number;
  slug: string;
  parent_id: number | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  admin_name: string | null;
  meta_id: number | null;
  published_at: Date | null;
};

export type FieldsArray = Array<keyof PageColumns>;

/**
 * Read all pages with the specified fields
 * @param param0 read pages with the specified fields
 * @returns an array of pages
 * @throws an error if the fields are invalid
 */
export async function readPages({ fields }: { fields: FieldsArray }) {
  let res = {};
  try {
    res = await sql`SELECT ${sql(fields)} FROM page`;
  } catch (e) {
    console.error(e);
  }
  return res as PageColumns[];
}

/**
 * Delete a page by its id
 * @param id the id of the page to delete
 * @returns whether the page was deleted successfully or not
 * @throws an error if the page has children
 */
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

export async function updatePage({
  id,
  fields,
}: {
  id: number;
  fields: Partial<PageColumns>;
}) {
  let status = false;
  try {
    if (Object.keys(fields).length === 0) {
      status = true;
      return status;
    }

    await sql`UPDATE page SET ${sql(fields)} WHERE id = ${id}`;
    status = true;
  } catch (e) {
    console.error(e);
  }
  return status;
}
