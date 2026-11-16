import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createPublicReadClient } from "@/lib/supabase/static";
import { createStaticClient } from "@/lib/supabase/static";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import {
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo/schema";

// Refresh the fleet and blog data every minute while still serving prerendered HTML.
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

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

// Fetch blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createPublicReadClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

// Fetch recent posts for sidebar
async function getRecentPosts(excludeSlug: string): Promise<BlogPost[]> {
  const supabase = createPublicReadClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .neq("slug", excludeSlug)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    return [];
  }

  return (data as BlogPost[]) || [];
}

export async function generateStaticParams() {
  const supabase = createStaticClient();

  if (!supabase) return [];

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true);

  return (
    (posts as unknown as { slug: string }[])?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover_image || undefined,
  });
}

/** Soft grounds the related cards rotate through. */
const TINTS = ["bg-tile-sand", "bg-tile-sage", "bg-tile-mist", "bg-tile-stone", "bg-tile-butter"];

/** Split off the last word so it takes the serif accent, as PageHeader does. */
function accentTitle(title: string) {
  const trimmed = title.trim();
  const cut = trimmed.lastIndexOf(" ");
  if (cut < 0) return { head: "", tail: trimmed };
  return { head: trimmed.slice(0, cut + 1), tail: trimmed.slice(cut + 1) };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRecentPosts(slug);

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

  // Helper to format inline bold formatting **text**
  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Lightweight markdown renderer, styled in the site's type system
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // H2 Headings
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="type-heading mb-4 mt-12 font-heading text-[clamp(1.6rem,4.5vw,2.2rem)] text-ink [overflow-wrap:anywhere]"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      // H3 Headings
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="type-heading mb-3 mt-9 font-heading text-xl text-ink sm:text-2xl"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Blockquotes
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="my-9 rounded-[1.6rem] bg-tile-butter px-6 py-7 sm:px-9 sm:py-9"
          >
            <p className="type-accent font-heading text-[clamp(1.3rem,3.5vw,1.65rem)] leading-snug text-ink">
              {formatInlineText(line.replace("> ", ""))}
            </p>
          </blockquote>
        );
      }
      // Unordered Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={index} className="mb-3 flex list-none items-start gap-3 text-ink/70">
            <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span className="text-[1.0625rem] leading-relaxed sm:text-lg">
              {formatInlineText(line.replace(/^[-*]\s+/, ""))}
            </span>
          </li>
        );
      }
      // Numbered Lists
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^(\d+)\./)?.[1] || "1";
        return (
          <li key={index} className="mb-3 flex list-none items-start gap-3 text-ink/70">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tile-sand text-xs font-semibold tabular-nums text-ink">
              {num}
            </span>
            <span className="text-[1.0625rem] leading-relaxed sm:text-lg">
              {formatInlineText(line.replace(/^\d+\.\s+/, ""))}
            </span>
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <div key={index} className="h-3" />;
      }
      // Standard Paragraphs
      return (
        <p key={index} className="mb-5 text-[1.0625rem] leading-relaxed text-ink/70 sm:text-lg">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://jiniaenterprise.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(`Read "${post.title}" on Jinia Enterprise`);
  const { head, tail } = accentTitle(post.title);

  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div className="bg-white pb-24 pt-24 text-ink sm:pt-32">
      <JsonLd
        data={[
          getArticleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            image: post.cover_image,
            datePublished: post.created_at,
            dateModified: post.updated_at || post.created_at,
            author: post.author,
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="container">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-ink/45">
          <Link href="/" className="inline-flex items-center py-3 -my-3 hover:text-ink">Home</Link>
          <span aria-hidden className="text-ink/25">/</span>
          <Link href="/blog" className="hover:text-ink">Journal</Link>
          <span aria-hidden className="text-ink/25">/</span>
          <span aria-current="page" className="line-clamp-1 max-w-[24ch] text-ink/70 sm:max-w-[48ch]">{post.title}</span>
        </nav>

        {/* Title block */}
        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time> · {getReadingTime(post.content)} min read
          </p>
          <h1 className="type-display mt-4 font-heading text-[clamp(2.4rem,8vw,4.8rem)] [overflow-wrap:anywhere]">
            {head}
            <span className="type-accent text-gold-deep">{tail}</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink/60 sm:text-lg">
            {post.excerpt}
          </p>
          <p className="mt-5 text-sm text-ink/50">
            By <span className="font-semibold text-ink/80">{post.author}</span>
          </p>
        </header>

        {/* Cover */}
        {post.cover_image && (
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] bg-tile-sand sm:aspect-[16/9]">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain p-5 sm:p-10"
            />
          </div>
        )}

        {/* Article + sidebar */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="min-w-0 lg:col-span-8">
            <div className="max-w-[68ch]">
              {renderContent(post.content)}
            </div>

            {/* Share */}
            <div className="mt-12 max-w-[68ch] border-t border-ink/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Share this guide</p>
              <p className="mt-2 text-sm text-ink/55">Forward it to a colleague or whoever books the cars.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {shareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:ring-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 flex max-w-[68ch] items-center gap-4 rounded-[1.6rem] bg-paper-deep p-5 sm:p-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink font-heading text-xl font-semibold text-paper">
                {post.author.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Written by</span>
                <span className="type-heading mt-0.5 block font-heading text-lg">{post.author}</span>
                <span className="mt-0.5 block text-sm text-ink/55">Jinia Enterprise, Dhaka</span>
              </span>
            </div>
          </article>

          {/* Plan a ride */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="rounded-[1.8rem] bg-tile-sage p-6 sm:p-8 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Plan a ride</p>
              <h2 className="type-display mt-3 font-heading text-[clamp(2rem,5vw,2.6rem)]">
                A car, a driver, <span className="type-accent text-gold-deep">sorted.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                Sedan, Prado or microbus with a professional driver. Tell us the trip and a person replies with one fixed price.
              </p>
              <div className="mt-6 grid gap-3">
                <OpenWizardButton className="group flex h-12 w-full items-center justify-between gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                  Request a car
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </OpenWizardButton>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Jinia%20Enterprise,%20I%20am%20reading%20"${encodeURIComponent(post.title)}"%20and%20would%20like%20to%20inquire%20about%20a%20car%20rental.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold transition-colors hover:bg-paper"
                >
                  <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
                  <span className="tabular-nums">{whatsappDisplay}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <p className="mt-5 text-xs text-ink/50">The desk is open 24/7. No deposit to ask.</p>
            </div>
          </aside>
        </div>

        {/* Links from the article to the pages that earn the booking */}
        <div className="mt-16 border-t border-ink/10 pt-10 sm:mt-20">
          <RelatedLinks
            title="Plan your trip"
            links={[
              { href: "/vehicles", label: "See the fleet" },
              { href: "/pricing", label: "Pricing" },
              { href: "/car-rental-dhaka", label: "Car rental in Dhaka" },
              { href: "/airport-car-rental", label: "Airport transfers" },
              { href: "/routes", label: "Routes out of Dhaka" },
              { href: "/booking", label: "Request a quote" },
            ]}
          />
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-ink/10 pt-12 sm:mt-24" aria-labelledby="related-posts">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 id="related-posts" className="type-display font-heading text-[clamp(2rem,5vw,3.2rem)]">
                Keep <span className="type-accent text-gold-deep">reading.</span>
              </h2>
              <Link
                href="/blog"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]"
              >
                <ArrowLeft className="h-4 w-4" /> All guides
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
              {relatedPosts.map((relatedPost, idx) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group flex flex-col">
                  <span className={`relative block aspect-[16/10] overflow-hidden rounded-[1.6rem] ${TINTS[idx % TINTS.length]}`}>
                    {relatedPost.cover_image ? (
                      <Image
                        src={relatedPost.cover_image}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="type-accent font-heading text-xl text-ink/30">Jinia Journal</span>
                      </span>
                    )}
                  </span>
                  <span className="mt-4 block px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                    {formatDate(relatedPost.created_at)} · {getReadingTime(relatedPost.content)} min
                  </span>
                  <h3 className="type-heading mt-2 line-clamp-3 px-1 font-heading text-[clamp(1.25rem,2.5vw,1.45rem)] [overflow-wrap:anywhere]">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
