import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

// One family, two voices: condensed widths for printed form labels and
// headings, normal width for the values people write in.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Docket — tech work, quoted and accepted",
  description:
    "Post tech jobs — web builds, IT support, networking, databases, custom apps — and let providers quote for the work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-desk text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="flex-1 w-full">
          {children}
        </main>
        <footer className="border-t border-rule">
          <div className="max-w-6xl mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-2">
            <span className="label">Docket</span>
            <span>Tech work only: web, IT support, networking, databases, custom apps.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
