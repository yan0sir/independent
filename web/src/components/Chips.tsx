"use client";

/** Row of single-select filter chips. */
export default function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`t-label rounded-full border px-4 py-2.5 transition-colors duration-300 ${
              on
                ? "border-ink bg-ink text-paper"
                : "border-line hover:border-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
