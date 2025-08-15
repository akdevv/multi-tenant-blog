"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-background border-b border-border/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight">
              Blog Application
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <SignedIn>
              <OrganizationSwitcher afterSelectOrganizationUrl="/org/:slug" />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="cursor-pointer">
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
