import { db } from "@/db";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { blogsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({
    slug: subdomain,
  });

  const orgId = org?.id;
  if (!orgId) {
    return notFound();
  }

  const blogs = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.orgId, orgId));

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="p-10 space-y-2">
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
        </div>
      ))}
    </div>
  );
}
