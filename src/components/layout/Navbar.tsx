"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/series", label: "Serie", disabled: true },
  { href: "/movies", label: "Film", disabled: true },
  { href: "/my-list", label: "La mia lista" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, hydrate, logout } = useAuthStore();
  const { query, setQuery } = useSearchStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (pathname !== "/search") {
      router.push("/search");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-blafflix-red">
            blafflix
          </Link>
          <nav className="hidden gap-5 text-sm font-medium text-neutral-200 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                disabled={link.disabled}
                onClick={() => !link.disabled && router.push(link.href)}
                className={`transition ${
                  pathname === link.href
                    ? "text-white"
                    : "text-neutral-300 hover:text-white"
                } ${link.disabled ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden w-52 md:block">
            <Input
              placeholder="Cerca"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-neutral-200 md:inline">
                Ciao,{" "}
                <span className="font-semibold">
                  {user.name}
                </span>
              </span>
              <button
                onClick={logout}
                className="text-xs text-neutral-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="secondary" className="text-xs md:text-sm">
                Accedi
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
