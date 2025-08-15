"use client";

import { useState } from "react";
import { createBlog } from "./actions";
import { useOrganization } from "@clerk/nextjs";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function OrganizationLandingPage() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const selectedOrg = useOrganization();

  const handleCreateBlog = async () => {
    if (!selectedOrg.organization) return;

    await createBlog({
      title: blogTitle.trim(),
      body: blogContent.trim(),
      orgId: selectedOrg.organization.id,
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="p-10 space-y-2">
        <Input
          placeholder="Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <Textarea
          placeholder="Enter your blog content..."
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        />
        <Button className="mt-2" onClick={handleCreateBlog}>
          Create Blog
        </Button>
      </div>
    </main>
  );
}
