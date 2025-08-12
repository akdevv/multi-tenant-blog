"use client";

import { useState } from "react";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function OrganizationLandingPage() {
  const [blogContent, setBlogContent] = useState("");

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="p-10">
        <Textarea
          placeholder="Enter your blog content..."
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        />
        <Button className="mt-2">Create Blog</Button>
      </div>
    </main>
  );
}
