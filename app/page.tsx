import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import Stamp from "@/components/Stamp";
import BudgetScale from "@/components/BudgetScale";
import { formatMoney } from "@/lib/format";

// Illustrative content for the hero. Shown with an "Example" tag; not real activity.
const EXAMPLE_JOB = {
  no: "7C41E2",
  title: "Move our office network onto a managed firewall",
  company: "Northgate Dental",
  category: "Networking",
  min: 2500,
  max: 4000,
  scope:
    "Replace the ISP router with a managed firewall, split guest Wi-Fi from the practice network, and write up the setup for our front desk.",
};

const EXAMPLE_QUOTES = [
  { who: "R. Okafor", amount: 3200, accepted: true, note: "Can start Monday. Two evenings on site, no downtime in clinic hours." },
  { who: "Lanline Networks", amount: 3850, accepted: false, note: "Includes a year of firmware updates and a one-page runbook." },
  { who: "M. Duarte", amount: 4400, accepted: false, note: "Would also replace the two ceiling access points." },
];

const CATEGORY_NOTES: Record<string, string> = {
  "Website build or refresh": "New sites, redesigns, speed and hosting moves.",
  "IT help desk / support": "Ongoing or one-off support for staff, laptops and accounts.",
  Networking: "Wi-Fi, firewalls, cabling, VPNs and office moves.",
  Databases: "Migrations, clean-ups, reporting and backups.",
  "Custom application development": "Internal tools, integrations and customer-facing apps.",
  Other: "Tech work that doesn't fit the categories above.",
};

const LIFECYCLE = [
  { status: "open" as const, title: "Post the job", body: "Say what needs doing, pick a category, and give a budget range." },
  { status: "pending" as const, title: "Quotes come in", body: "Providers send a price and a short note on how they'd do it." },
  { status: "accepted" as const, title: "Accept one", body: "Compare every quote against your budget and accept the one that fits." },
  { status: "in_progress" as const, title: "Work starts", body: "The job is marked in progress and comes off the open jobs list." },
];

export default function Home() {
  return (
    <>
      {/* First viewport: the mechanism, shown as a ticket collecting quotes. */}
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-16 sm:pt-20 sm:pb-24 grid lg:grid-cols-12 gap-x-10 gap-y-14 items-start">
        <div className="lg:col-span-5 lg:pt-6">
          <h1
            className="font-extrabold leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,4.2vw+1.4rem,5rem)]"
            style={{ fontStretch: "68%" }}
          >
            Write the job down. Let tech providers quote for it.
          </h1>
          <p className="mt-6 text-lg text-ink-2 max-w-md">
            Docket is a marketplace for tech work only: website builds, IT help desk, networking,
            databases and custom apps. Companies post a job, providers send quotes, and you accept
            the one that fits.
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

        <div className="lg:col-span-7 relative" aria-label="Example job with three quotes, one accepted" role="group">
          <span className="absolute -top-3 right-4 z-10 bg-ink text-stock text-xs font-semibold px-2 py-1 rounded-[2px]">
            Example
          </span>

          <article className="ticket relative z-[4]">
            <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-3">
              <span className="ticket-no text-ink-2">No. {EXAMPLE_JOB.no}</span>
              <Stamp status="in_progress" large />
            </div>
            <div className="perf" aria-hidden="true" />
            <div className="px-5 sm:px-7 py-6">
              <h2 className="text-2xl sm:text-3xl">{EXAMPLE_JOB.title}</h2>
              <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-y border-rule py-4">
                <div>
                  <dt className="label">Posted by</dt>
                  <dd className="mt-1">{EXAMPLE_JOB.company}</dd>
                </div>
                <div>
                  <dt className="label">Category</dt>
                  <dd className="mt-1">{EXAMPLE_JOB.category}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="label">Budget</dt>
                  <dd className="mt-1 num">
                    {formatMoney(EXAMPLE_JOB.min)} – {formatMoney(EXAMPLE_JOB.max)}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-ink-2 max-w-prose">{EXAMPLE_JOB.scope}</p>
            </div>
          </article>

          <ol className="relative -mt-1">
            {EXAMPLE_QUOTES.map((q, i) => (
              <li
                key={q.who}
                className={`copy-sheet fan relative ${q.accepted ? "shadow-[inset_0_0_0_2px_var(--stamp-open)]" : ""} px-5 sm:px-7 pt-5 pb-4 -mt-1`}
                style={{
                  zIndex: 3 - i,
                  marginLeft: `${(i + 1) * 0.75}rem`,
                  marginRight: `${(2 - i) * 0.5}rem`,
                  rotate: `${[1.2, -1.6, 0.9][i]}deg`,
                  transformOrigin: i === 1 ? "right top" : "left top",
                  animationDelay: `${150 + i * 110}ms`,
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="flex items-center gap-3">
                    <span className="font-semibold">{q.who}</span>
                    {q.accepted && <Stamp status="accepted" />}
                  </span>
                  <span className="num text-xl font-bold" style={{ fontStretch: "80%" }}>
                    {formatMoney(q.amount)}
                  </span>
                </div>
                <div className="mt-2 grid sm:grid-cols-[1fr_12rem] gap-x-6 gap-y-2 items-start">
                  <p className="text-sm text-ink-2">{q.note}</p>
                  <BudgetScale amount={q.amount} min={EXAMPLE_JOB.min} max={EXAMPLE_JOB.max} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How a job moves: a real sequence, so it's shown in order. */}
      <section className="bg-stock border-y border-rule-strong">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl max-w-xl">How a job moves</h2>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-dashed border-ink">
            {LIFECYCLE.map((step, i) => (
              <li
                key={step.title}
                className={`relative -mt-[15px] pt-0 pb-2 sm:pr-6 ${i > 0 ? "lg:pl-6 lg:border-l border-rule" : ""} ${
                  i % 2 === 1 ? "sm:pl-6 sm:border-l" : ""
                } border-rule`}
              >
                <Stamp status={step.status} className="bg-stock" />
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two sides of the ticket. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid md:grid-cols-2 gap-x-14 gap-y-14">
        <div>
          <h2 className="text-3xl sm:text-4xl">If you need the work done</h2>
          <ul className="mt-6 ruled border-y border-rule text-lg">
            <li className="py-3.5">Describe the job in plain language. No spec document needed.</li>
            <li className="py-3.5">Set a budget range so quotes land in the right ballpark.</li>
            <li className="py-3.5">See every quote side by side, measured against your budget.</li>
            <li className="py-3.5">Accept one quote and the job moves to in progress.</li>
          </ul>
          <Link href="/signup" className="btn-primary mt-8">
            Post a job
          </Link>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl">If you do the work</h2>
          <ul className="mt-6 ruled border-y border-rule text-lg">
            <li className="py-3.5">Only tech jobs. No logo contests, no data entry.</li>
            <li className="py-3.5">Scan category, budget and age before you open a job.</li>
            <li className="py-3.5">Quote your price with a note on how you&apos;d do it.</li>
            <li className="py-3.5">Solo freelancers and small teams quote on the same terms.</li>
          </ul>
          <Link href="/jobs" className="btn-quiet mt-8">
            Browse open jobs
          </Link>
        </div>
      </section>

      {/* The categories are the whole scope. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-x-10 gap-y-8">
        <div className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl">What gets posted here</h2>
          <p className="mt-3 text-ink-2">
            Every job on Docket falls into one of these categories. That&apos;s deliberate.
          </p>
        </div>
        <ul className="lg:col-span-8 ruled border-y-2 border-ink">
          {CATEGORIES.map((c) => (
            <li key={c} className="py-4 grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-x-8 gap-y-1 items-baseline">
              <span className="text-xl sm:text-2xl font-semibold" style={{ fontStretch: "80%" }}>
                {c}
              </span>
              {CATEGORY_NOTES[c] && <span className="text-ink-2">{CATEGORY_NOTES[c]}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Close on the committed colour field. */}
      <section className="bg-canary border-y border-ink">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 flex flex-wrap items-end justify-between gap-8">
          <h2
            className="font-extrabold leading-[0.95] text-[clamp(2.25rem,3vw+1.25rem,3.75rem)] max-w-2xl"
            style={{ fontStretch: "68%" }}
          >
            Have a tech job that needs doing?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn-ink">
              Create an account
            </Link>
            <Link href="/jobs" className="btn-quiet border-ink hover:bg-canary-deep">
              See open jobs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
