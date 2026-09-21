import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-20">
      <p className="text-teal font-medium mb-3">For companies that need tech work done</p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold max-w-2xl leading-tight">
        Post the job. Let tech providers bid for it.
      </h1>
      <p className="mt-5 max-w-xl text-ink-soft text-lg leading-relaxed">
        Website refreshes, IT help desk, networking, databases, custom
        applications — describe what you need, get bids from providers who
        want the work, and pick the one that fits.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/signup" className="btn-primary">
          Get started
        </Link>
        <Link href="/jobs" className="btn-quiet">
          Browse open jobs
        </Link>
      </div>

      <div className="mt-20 grid sm:grid-cols-3 gap-8 max-w-3xl border-t border-border pt-10">
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">Post</h3>
          <p className="text-sm text-ink-soft">
            Companies describe the job, the category, and a budget range.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">Bid</h3>
          <p className="text-sm text-ink-soft">
            Providers browse open jobs and submit a price and a message.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">Choose</h3>
          <p className="text-sm text-ink-soft">
            The company picks a bid and the work gets underway.
          </p>
        </div>
      </div>
    </div>
  );
}
