"use server";

import { db } from "@/db";
import { CreateBlogType, blogsTable } from "@/db/schema";

export const createBlog = async (payload: CreateBlogType) => {
  const result = await db.insert(blogsTable).values(payload).returning({
    id: blogsTable.id,
  });

  return result[0].id;
};
