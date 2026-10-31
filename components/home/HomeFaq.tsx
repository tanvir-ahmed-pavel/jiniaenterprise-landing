import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFAQSchema } from "@/lib/seo/schema";
import { homeFaqs } from "@/content/home-faqs";

/** Native <details>: open and close without JavaScript, answers always in the HTML. */
export function HomeFaq() {
  return (
    <section aria-labelledby="home-faq-title" className="bg-white py-20 sm:py-24">
      <JsonLd data={getFAQSchema(homeFaqs)} />
      <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 font-board text-[11px] tracking-[0.18em] text-[var(--jinia-green)]">
            <span aria-hidden className="h-px w-6 bg-[var(--jinia-gold)]" />
            QUESTIONS
          </p>
          <h2 id="home-faq-title" className="mt-4 font-heading text-[2.1rem] font-semibold leading-[1.08] text-[var(--jinia-ink)] sm:text-[2.6rem]">
            Straight answers.
          </h2>
          <Link href="/faq" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-[var(--jinia-green)] underline underline-offset-4">
            All questions
          </Link>
        </div>
        <div className="divide-y divide-[var(--jinia-line)] border-y border-[var(--jinia-line)]">
          {homeFaqs.map((faq, index) => (
            <details key={faq.question} className="group py-1" open={index === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-medium text-[var(--jinia-ink)] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden className="font-board text-lg text-[var(--jinia-green)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pr-8 text-base leading-relaxed text-[var(--jinia-ink-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
