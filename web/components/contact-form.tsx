"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-accent-soft p-8">
        <h2 className="text-[1.3rem] font-semibold tracking-[-0.01em]">
          Thank you — your request is noted.
        </h2>
        <p className="mt-2 max-w-[52ch] text-muted">
          This is a preview form; message delivery will be connected before
          launch. In the meantime, please reach us directly using the details on
          this page.
        </p>
        <button
          onClick={() => setSent(false)}
          className="focus-ring mt-5 rounded-full border border-line px-5 py-2 text-[0.9rem] font-medium hover:border-accent hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4"
    >
      <Field id="name" label="Name" required />
      <Field id="company" label="Company" />
      <Field id="email" label="Email" type="email" required />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[0.85rem] font-medium">
          Requirements <span className="text-muted">(reference numbers, quantities)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={ref ? `Please quote reference ${ref}:\n` : ""}
          className="focus-ring resize-y rounded-lg border border-line bg-surface px-4 py-2.5 text-[0.95rem]"
        />
      </div>
      <button
        type="submit"
        className="focus-ring mt-1 self-start rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Submit request
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.85rem] font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="focus-ring rounded-lg border border-line bg-surface px-4 py-2.5 text-[0.95rem]"
      />
    </div>
  );
}
