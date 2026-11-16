import Link from "next/link";
import Image from "next/image";
import { createPublicReadClient } from "@/lib/supabase/static";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo/metadata";

// Refresh the fleet and blog data every minute while still serving prerendered HTML.
export const revalidate = 60;

export const metadata = createMetadata({
  title: "Car Rental Guides & Travel Notes",
  description:
    "Practical guides on monthly rental, airport transfers, and chauffeur travel in Dhaka from Jinia Enterprise.",
  path: "/blog",
});

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createPublicReadClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data as BlogPost[]) || [];
}

/** Soft grounds the cards rotate through, the same tints the fleet uses. */
const TINTS = ["bg-tile-sand", "bg-tile-sage", "bg-tile-mist", "bg-tile-stone", "bg-tile-butter"];

/** Cover on its tint. Covers are transparent car photos, so they sit contained. */
function Cover({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="type-accent font-heading text-2xl text-ink/30">Jinia Journal</span>
      </span>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03] sm:p-8"
    />
  );
}

export default async function BlogPage() {
  const publishedPosts = await getBlogPosts();
  const featuredPost = publishedPosts[0];
  const otherPosts = publishedPosts.slice(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="bg-white pb-24 text-ink">
      <PageHeader
        title="The Journal."
        subtitle="Guides and travel notes"
        description="Practical notes on monthly rental, airport runs and chauffeured travel in Dhaka, written by the people who dispatch the cars."
        breadcrumbs={[{ label: "Journal" }]}
      />

      <div className="container pt-12 sm:pt-16">
        {publishedPosts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[2rem] bg-paper-deep px-6 py-16 text-center sm:px-12 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Nothing published yet</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2rem,6vw,3rem)]">
              First guides are <span className="type-accent text-gold-deep">on the way.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/60">
              We are writing them now. In the meantime, the desk answers questions directly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <OpenWizardButton className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                Request a car
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </OpenWizardButton>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:ring-ink"
              >
                Back home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Lead story */}
            {featuredPost && (
              <section aria-labelledby="featured-post">
                <Link href={`/blog/${featuredPost.slug}`} className="group grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-14">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[2rem] bg-tile-sand sm:aspect-[16/10] lg:col-span-7">
                    <Cover
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold">Featured</span>
                  </span>

                  <span className="block min-w-0 lg:col-span-5">
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      {formatDate(featuredPost.created_at)} · {getReadingTime(featuredPost.content)} min read
                    </span>
                    <h2 id="featured-post" className="type-display mt-4 font-heading text-[clamp(2rem,5.5vw,3.4rem)] [overflow-wrap:anywhere]">
                      {featuredPost.title}
                    </h2>
                    <span className="mt-5 line-clamp-4 block text-base leading-relaxed text-ink/60 sm:text-lg">
                      {featuredPost.excerpt}
                    </span>
                    <span className="mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors group-hover:bg-forest-soft">
                      Read the guide
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </span>
                </Link>
              </section>
            )}

            {/* More from the journal */}
            {otherPosts.length > 0 && (
              <section className="mt-20 border-t border-ink/10 pt-12 sm:mt-24" aria-labelledby="more-posts">
                <div className="mb-8 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">More from the journal</p>
                  <h2 id="more-posts" className="type-display mt-4 font-heading text-[clamp(2rem,5vw,3.2rem)]">
                    Keep <span className="type-accent text-gold-deep">reading.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {otherPosts.map((post, idx) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                      <span className={`relative block aspect-[16/10] overflow-hidden rounded-[1.6rem] ${TINTS[(idx + 1) % TINTS.length]}`}>
                        <Cover
                          src={post.cover_image}
                          alt={post.title}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </span>
                      <span className="mt-4 block px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                        {formatDate(post.created_at)} · {getReadingTime(post.content)} min
                      </span>
                      <h3 className="type-heading mt-2 px-1 font-heading text-[clamp(1.35rem,3vw,1.6rem)] [overflow-wrap:anywhere]">
                        {post.title}
                      </h3>
                      <span className="mt-2 line-clamp-3 block px-1 text-sm leading-relaxed text-ink/60">
                        {post.excerpt}
                      </span>
                      <span className="mt-auto inline-flex min-h-11 items-center gap-2 px-1 pt-3 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                        Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Plan a ride */}
        <section className="mt-20 rounded-[2rem] bg-tile-sage px-6 py-12 sm:mt-24 sm:px-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Plan a ride</p>
              <h2 className="type-display mt-4 font-heading text-[clamp(2.2rem,7vw,4.2rem)]">
                Read enough? <span className="type-accent text-gold-deep">Let’s go.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-sm text-base leading-relaxed text-ink/65">
                Tell us the trip in four taps. A person replies with one fixed price, usually inside the hour.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <OpenWizardButton className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                  Request a car
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </OpenWizardButton>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white"
                >
                  <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
                  <span className="tabular-nums">{whatsappDisplay}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
