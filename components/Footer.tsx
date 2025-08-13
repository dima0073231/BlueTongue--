"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/profile", label: "Profile", icon: "/apple-icon.svg" },
  { href: "/library", label: "Library", icon: "/email-icon.svg" },
  { href: "/tutor", label: "Tutor", icon: "/google-icon.svg" },
  { href: "/resume", label: "Resume", icon: "/apple-icon.svg" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-brand-600 text-white">
      <div className="mx-auto max-w-md grid grid-cols-4 gap-2 px-6 py-3">
        {items.map(it => {
          const active = path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <div
                className={`h-6 w-6 rounded-xl2 bg-white/10 grid place-items-center ${
                  active ? "ring-2 ring-white/70" : ""
                }`}
              >
                <img src={it.icon} alt="" className="h-4 w-4 opacity-90" />
              </div>
              <span className="opacity-95">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
