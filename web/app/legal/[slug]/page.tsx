import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { policies, getPolicy } from "@/lib/legal";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) return { title: "Legal" };
  return { title: p.title, description: p.intro };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <div className="container-c py-14">
      <div className="mx-auto max-w-prose">
        <header className="border-b border-line pb-8">
          <span className="eyebrow">Legal</span>
          <h1 className="heading-upper mt-4 text-[2.2rem] sm:text-[2.8rem]">
            {policy.title}
          </h1>
          <p className="ref mt-3 text-[0.82rem] text-muted">
            Last updated: {policy.updated}
          </p>
        </header>

        <p className="mt-8 text-[1.05rem] leading-relaxed text-ink-2">{policy.intro}</p>

        <div className="mt-6 rounded-card border border-line bg-surface-2 px-5 py-4 text-[0.82rem] leading-relaxed text-muted">
          This is a template provided for the website build and should be reviewed
          and approved by a qualified legal professional before launch.
        </div>

        <div className="mt-10 flex flex-col gap-10">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[1.2rem] font-semibold tracking-tight">{s.heading}</h2>
              {s.body?.map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink-2">
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed text-ink-2">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
