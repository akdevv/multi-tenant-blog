import { db } from "@/db";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { blogsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { HiOutlineClock, HiOutlineUser } from "react-icons/hi";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/3 via-transparent to-secondary/3">
      <header className="bg-white/80 backdrop-blur-xl border-b border-border/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {org.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome to our blog
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
              <HiOutlineUser className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">No blogs yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This organization hasn't published any blog posts yet. Check back later for updates!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {blogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      <time dateTime={blog.createdAt.toISOString()}>
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {blog.body}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-border/20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {org.name}. Powered by BlogHub.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}