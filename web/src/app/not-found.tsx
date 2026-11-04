import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[80vh] flex-col justify-end pb-24 pt-40">
      <h1 className="t-display t-xl">This table&apos;s empty.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The page you&apos;re looking for has moved or never existed.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="t-label rounded-full bg-ink px-6 py-4 text-paper">
          Back home
        </Link>
        <Link href="/brands" className="t-label rounded-full border border-ink px-6 py-4">
          See our brands
        </Link>
      </div>
    </main>
  );
}
