"use client";

import { useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { HiOutlinePlus, HiOutlineClock, HiOutlineDocumentText, HiOutlineExternalLink } from "react-icons/hi";

interface Blog {
  id: number;
  title: string;
  body: string;
  orgId: string;
  createdAt: Date;
}

export default function OrganizationBlogsPage() {
  const { organization } = useOrganization();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organization) {
      fetchBlogs();
    }
  }, [organization]);

  const fetchBlogs = async () => {
    if (!organization) return;
    
    try {
      const response = await fetch(`/api/org/${organization.id}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Blog Posts
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and view all blog posts for {organization?.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push(`/org/${organization?.slug}`)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <HiOutlinePlus className="w-4 h-4 mr-2" />
                New Post
              </Button>
              {organization?.slug && (
                <Button
                  variant="outline"
                  className="border-border/30 hover:bg-muted/30 backdrop-blur-sm transition-all"
                  onClick={() => window.open(`http://${organization.slug}.${process.env.NEXT_PUBLIC_APP_URL}`, '_blank')}
                >
                  <HiOutlineExternalLink className="w-4 h-4 mr-2" />
                  Visit Site
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/50 border border-border/20 animate-pulse">
                  <div className="h-6 bg-muted/30 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-muted/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted/20 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
                <HiOutlineDocumentText className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">No blog posts yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Start creating content for your blog. Your posts will appear here.
              </p>
              <Button
                onClick={() => router.push(`/org/${organization?.slug}`)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <HiOutlinePlus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <article 
                  key={blog.id} 
                  className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    // In a real app, you might navigate to an edit page
                    console.log("Edit blog:", blog.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-foreground/70 line-clamp-2">
                        {blog.body}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1">
                          <HiOutlineClock className="w-4 h-4" />
                          <time>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete blog:", blog.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className="mt-12 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Blog Statistics</h3>
                  <p className="text-sm text-muted-foreground">
                    {blogs.length} post{blogs.length !== 1 ? 's' : ''} published
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Your blog URL</p>
                  <code className="text-sm font-mono text-primary">
                    {organization?.slug}.{process.env.NEXT_PUBLIC_APP_URL}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}