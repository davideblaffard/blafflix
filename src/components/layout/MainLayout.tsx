import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blafflix-dark to-black">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
