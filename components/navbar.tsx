"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  OrganizationSwitcher,
  useOrganization,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const Navbar: React.FC = () => {
  const { organization } = useOrganization();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-border/20 sticky top-0 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="group">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                BlogHub
              </h1>
            </Link>
            <SignedIn>
              {organization && (
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href={`/org/${organization.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Create Blog
                  </Link>
                  <Link
                    href={`/org/${organization.slug}/blogs`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View All Blogs
                  </Link>
                  {organization.slug && (
                    <a
                      href={`http://${organization.slug}.${process.env.NEXT_PUBLIC_APP_URL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      Visit Site
                      <HiOutlineExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </SignedIn>
          </div>
          <div className="flex items-center gap-3">
            <SignedIn>
              <div className="flex items-center gap-3">
                <OrganizationSwitcher 
                  afterSelectOrganizationUrl="/org/:slug"
                  appearance={{
                    elements: {
                      rootBox: "flex",
                      organizationSwitcherTrigger: "px-3 py-2 rounded-lg border border-border/30 hover:bg-muted/50 hover:border-primary/30 transition-all"
                    }
                  }}
                />
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-border/30 hover:ring-primary/50 transition-all"
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
