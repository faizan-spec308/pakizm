"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-card border border-line bg-accent-soft p-8">
        <h2 className="display text-[1.7rem]">Thank you — your request is noted.</h2>
        <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">
          This is a preview form; message delivery will be connected before
          launch. In the meantime, please reach us directly using the details on
          this page.
        </p>
        <button onClick={() => setSent(false)} className="btn btn-ghost mt-6">
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
          className="resize-y rounded-btn border border-line bg-surface px-4 py-3 text-[0.95rem] transition-colors focus:border-line-2"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2 self-start">
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
        className="rounded-btn border border-line bg-surface px-4 py-3 text-[0.95rem] transition-colors focus:border-line-2"
      />
    </div>
  );
}
