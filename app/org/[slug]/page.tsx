"use client";

import { useState } from "react";
import { createBlog } from "./actions";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HiOutlineLightningBolt, HiOutlineGlobeAlt } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";

export default function OrganizationLandingPage() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { organization } = useOrganization();
  const router = useRouter();

  const handleCreateBlog = async () => {
    if (!organization || !blogTitle.trim() || !blogContent.trim()) return;

    setIsCreating(true);
    try {
      await createBlog({
        title: blogTitle.trim(),
        body: blogContent.trim(),
        orgId: organization.id,
      });
      setBlogTitle("");
      setBlogContent("");
      router.push(`/org/${organization.slug}/blogs`);
    } catch (error) {
      console.error("Failed to create blog:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create New Blog Post
              </span>
            </h1>
            <p className="text-muted-foreground">
              Share your thoughts with the world on {organization?.name || "your organization"}'s blog
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/20 shadow-lg">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-foreground">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter an engaging title..."
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="h-12 bg-white border-border/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium text-foreground">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog content here..."
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="min-h-[300px] bg-white border-border/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    onClick={handleCreateBlog}
                    disabled={!blogTitle.trim() || !blogContent.trim() || isCreating}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                    size="lg"
                  >
                    {isCreating ? (
                      <>
                        <CgSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Blog Post"
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => router.push(`/org/${organization?.slug}/blogs`)}
                    className="border-border/30 hover:bg-muted/30 backdrop-blur-sm transition-all"
                  >
                    View All Blogs
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <HiOutlineLightningBolt className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">Quick Tip</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use markdown formatting to style your blog posts with headers, lists, and emphasis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                    <HiOutlineGlobeAlt className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Your Subdomain</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your blog will be available at{" "}
                  <span className="text-primary font-mono">
                    {organization?.slug || "your-org"}.{process.env.NEXT_PUBLIC_APP_URL}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}