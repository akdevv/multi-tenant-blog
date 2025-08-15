import Navbar from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineAdjustments, HiOutlineUserGroup, HiOutlineLightningBolt } from "react-icons/hi";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Multi-Tenant Blog Platform
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Create and manage beautiful blogs for your organization with our powerful subdomain-based platform
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="min-w-[200px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              asChild
            >
              <Link href="/org">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-border/30 hover:bg-muted/30 backdrop-blur-sm transition-all"
              asChild
            >
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-border/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                <HiOutlineAdjustments className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Subdomains</h3>
              <p className="text-sm text-muted-foreground">
                Each organization gets its own unique subdomain for their blog
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-border/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4">
                <HiOutlineUserGroup className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Work together with your team to create and manage content
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-border/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4">
                <HiOutlineLightningBolt className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Built with Next.js and optimized for performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
