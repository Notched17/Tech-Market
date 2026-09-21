import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/types";
import StateMark from "@/components/StateMark";
import TitleBlock from "@/components/TitleBlock";
import DimensionLine from "@/components/DimensionLine";

// Illustrative content for the hero, shown with an "Example" tag. Not real activity.
const EXAMPLE = {
  no: "7C41E2",
  title: "Move our office network onto a managed firewall",
  company: "Northgate Dental",
  category: "Networking",
  min: 2500,
  max: 4000,
  scope:
    "Replace the ISP router with a managed firewall, keep guest Wi-Fi apart from the practice network, and write up the setup for our front desk.",
  quotes: [
    { label: "R. Okafor", amount: 3200 },
    { label: "Lanline Networks", amount: 3850 },
    { label: "M. Duarte", amount: 4400 },
  ],
};

const LIFECYCLE = [
  { status: "open" as const, title: "Spec the job", body: "Say what needs doing, pick a category, and give a budget range." },
  { status: "pending" as const, title: "Quotes land", body: "Providers send a price and a short note on how they'd do it." },
  { status: "accepted" as const, title: "Accept one", body: "Each quote sits on your budget line. Accept the one that fits." },
  { status: "in_progress" as const, title: "Work starts", body: "The job moves to in progress and comes off the open jobs list." },
];

const CATEGORY_NOTES: Record<string, string> = {
  "Website build or refresh": "New sites, redesigns, speed fixes and hosting moves.",
  "IT help desk / support": "Ongoing or one-off support for staff, laptops and accounts.",
  Networking: "Wi-Fi, firewalls, cabling, VPNs and office moves.",
  Databases: "Migrations, clean-ups, reporting and backups.",
  "Custom application development": "Internal tools, integrations and customer-facing apps.",
  Other: "Tech work that doesn't fit the categories above.",
};

// A margin note with a leader line pointing back into the drawing (wide screens only).
function Callout({ children }: { children: ReactNode }) {
  return (
    <span className="hidden xl:flex items-start gap-2 note text-blue pt-1">
      <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true" className="mt-1 shrink-0">
        <circle cx="3" cy="5" r="2.25" fill="currentColor" />
        <path d="M3 5H28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
      <span>{children}</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* First viewport: a job drawn up as a spec, with its quotes on the budget line. */}
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-16 sm:pt-20 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
        <div className="lg:col-span-5 lg:pt-8">
          <h1 className="text-[clamp(2.625rem,3.6vw+1.35rem,4.5rem)] font-extrabold leading-[1] tracking-[-0.035em]">
            Spec the job. Tech providers quote against it.
          </h1>
          <p className="mt-6 text-lg text-ink-2 max-w-md">
            Docket is a marketplace for tech work only: website builds, IT help desk, networking,
            databases and custom apps. Companies describe the job and a budget range, providers send
            quotes, and you accept the one that fits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary">
              Post a job
            </Link>
            <Link href="/jobs" className="btn-quiet">
              Find work
            </Link>
          </div>
        </div>

        <figure className="lg:col-span-7 relative" aria-label="Example job sheet with three quotes plotted against its budget">
          <span className="absolute -top-3 left-6 z-10 bg-ink text-sheet text-xs font-semibold px-2 py-1">
            Example
          </span>
          <div className="sheet px-6 sm:px-8 pt-8 pb-6">
            <div className="grid xl:grid-cols-[minmax(0,1fr)_9.5rem] gap-x-5">
              <h2 className="text-2xl sm:text-[1.75rem] leading-tight">{EXAMPLE.title}</h2>
              <span className="hidden xl:block" />
              <p className="mt-3 text-ink-2">{EXAMPLE.scope}</p>
              <Callout>Written the way you&apos;d explain it</Callout>

              <p className="note mt-7">Budget</p>
              <span className="hidden xl:block" />
              <DimensionLine min={EXAMPLE.min} max={EXAMPLE.max} plots={EXAMPLE.quotes} animate className="mt-1" />
              <Callout>Each quote lands on your budget line</Callout>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <p className="note max-w-[16rem]">Three quotes received. The company accepts one.</p>
              <TitleBlock
                className="w-full sm:w-[19rem]"
                cells={[
                  { label: "Sheet", value: <span className="sheet-no">No. {EXAMPLE.no}</span> },
                  { label: "State", value: <StateMark status="open" /> },
                  { label: "Category", value: EXAMPLE.category },
                  { label: "Posted by", value: EXAMPLE.company },
                ]}
              />
            </div>
          </div>
        </figure>
      </section>

      {/* How a job moves: a real sequence, drawn along one line. */}
      <section className="bg-sheet border-y border-rule-strong">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl">How a job moves</h2>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 relative">
            <span aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[10px] h-px bg-blue" />
            {LIFECYCLE.map((step) => (
              <li key={step.title} className="relative">
                <StateMark status={step.status} className="bg-sheet pr-2 relative" />
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Both sides of the marketplace. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid md:grid-cols-2 gap-6">
        <div className="sheet p-7 sm:p-9">
          <h2 className="text-3xl">If you need the work done</h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule text-lg">
            <li className="py-3">Describe the job in plain language. No spec document needed.</li>
            <li className="py-3">Set a budget range so quotes land in the right ballpark.</li>
            <li className="py-3">See every quote plotted against your budget.</li>
            <li className="py-3">Accept one and the job moves to in progress.</li>
          </ul>
          <Link href="/signup" className="btn-primary mt-7">
            Post a job
          </Link>
        </div>
        <div className="sheet p-7 sm:p-9">
          <h2 className="text-3xl">If you do the work</h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule text-lg">
            <li className="py-3">Only tech jobs. No logo contests, no data entry.</li>
            <li className="py-3">Scan category, budget and age before you open a job.</li>
            <li className="py-3">Quote your price with a note on how you&apos;d do it.</li>
            <li className="py-3">Solo freelancers and small teams quote on the same terms.</li>
          </ul>
          <Link href="/jobs" className="btn-quiet mt-7">
            Browse open jobs
          </Link>
        </div>
      </section>

      {/* The categories, set out like a drawing index. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-8">
        <div className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl">What gets posted here</h2>
          <p className="mt-3 text-ink-2">Every job on Docket falls into one of these categories. That&apos;s deliberate.</p>
        </div>
        <table className="lg:col-span-8 w-full bg-sheet border-[1.5px] border-ink text-left">
          <thead>
            <tr className="border-b-[1.5px] border-ink">
              <th scope="col" className="note px-4 py-2.5 font-semibold">
                Category
              </th>
              <th scope="col" className="note px-4 py-2.5 font-semibold hidden sm:table-cell">
                Covers
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {CATEGORIES.map((c) => (
              <tr key={c} className="align-baseline">
                <th scope="row" className="px-4 py-3.5 text-lg font-bold">
                  {c}
                  <span className="block sm:hidden mt-1 text-base font-normal text-ink-2">{CATEGORY_NOTES[c]}</span>
                </th>
                <td className="px-4 py-3.5 text-ink-2 hidden sm:table-cell">{CATEGORY_NOTES[c]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Close on a true blueprint: white linework on blue. */}
      <section
        className="bg-blue text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 flex flex-wrap items-end justify-between gap-8">
          <h2 className="text-[clamp(2.25rem,2.6vw+1.4rem,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] max-w-2xl">
            Have a tech job that needs doing?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn-quiet border-white text-blue hover:text-blue-deep hover:border-white">
              Create an account
            </Link>
            <Link href="/jobs" className="btn-primary border-white/70 bg-transparent hover:bg-white/10">
              See open jobs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
