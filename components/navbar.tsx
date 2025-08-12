"use client";

import { UserButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <nav className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold tracking-tight">
                Blog Application
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <OrganizationSwitcher />
              <UserButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
