import type { Metadata } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

// Chivo for everything people read; Chivo Mono only for measurements
// (money, job numbers, dates), the way a drawing sets its dimensions.
const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docket — spec the job, get quotes",
  description:
    "A marketplace for tech work only. Companies spec a job — web builds, IT support, networking, databases, custom apps — and providers quote for it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${chivo.variable} ${chivoMono.variable} h-full`}>
      <body className="min-h-full flex flex-col text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="flex-1 w-full">
          {children}
        </main>
        <footer className="border-t border-rule-strong bg-sheet">
          <div className="max-w-6xl mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3 note">
            <span className="font-semibold text-ink">Docket</span>
            <span>Tech work only: web, IT support, networking, databases and custom apps.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
