"use client";

import { UserButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";

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
              <OrganizationSwitcher afterSelectOrganizationUrl="/org/:slug" />
              <UserButton />
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
