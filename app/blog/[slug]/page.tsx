import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  User, 
  Share2, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  Quote as QuoteIcon
} from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo/schema";

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
  const supabase = await createClient();
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
  const supabase = await createClient();
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
          <strong key={i} className="font-medium text-emerald-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Rich Editorial Markdown Parser with luxury styling
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // H2 Headings
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-emerald-950 mt-12 mb-5 tracking-tight border-b border-emerald-900/10 pb-3"
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
            className="text-xl sm:text-2xl font-heading font-medium text-emerald-900 mt-8 mb-3 tracking-tight"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Blockquotes
      if (line.startsWith("> ")) {
        return (
          <div
            key={index}
            className="my-8 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-emerald-50 via-white to-emerald-50/50 border-l-4 border-emerald-600 shadow-xs"
          >
            <div className="flex gap-4 items-start">
              <QuoteIcon className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
              <p className="text-base sm:text-lg font-heading font-medium text-emerald-950 italic leading-relaxed">
                {formatInlineText(line.replace("> ", ""))}
              </p>
            </div>
          </div>
        );
      }
      // Unordered Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={index} className="ml-4 sm:ml-6 flex items-start gap-3 text-gray-700 mb-3.5 list-none">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0 ring-4 ring-emerald-100" />
            <span className="text-base sm:text-lg font-medium leading-relaxed">
              {formatInlineText(line.replace(/^[-*]\s+/, ""))}
            </span>
          </li>
        );
      }
      // Numbered Lists
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^(\d+)\./)?.[1] || "1";
        return (
          <li key={index} className="ml-4 sm:ml-6 flex items-start gap-3.5 text-gray-700 mb-3.5 list-none">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-medium flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
              {num}
            </span>
            <span className="text-base sm:text-lg font-medium leading-relaxed">
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
        <p key={index} className="text-gray-700 text-base sm:text-lg md:text-[19px] font-normal leading-relaxed mb-6">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://jiniaenterprise.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(`Read "${post.title}" on Jinia Enterprise`);

  return (
    <div className="pb-24">
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
      <section className="border-b border-emerald-950/10 pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="container relative z-10">
          <div className="max-w-4xl space-y-8">
            {/* Back Navigation */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-b border-emerald-950/25 pb-1 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950 transition-colors hover:border-emerald-700 hover:text-emerald-700 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Journal</span>
            </Link>

            <div className="space-y-4">
              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-5 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-700">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-700" />
                  {formatDate(post.created_at)}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-950/55">
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  {getReadingTime(post.content)} min read
                </span>
                <span className="flex items-center gap-1.5 text-emerald-950/55">
                  <User className="h-3.5 w-3.5 text-emerald-700" />
                  By {post.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-medium text-emerald-950 tracking-tight leading-[1.1]">
                {post.title}
              </h1>

              {/* Excerpt Lead */}
              <p className="max-w-3xl border-l-2 border-amber-400 pl-5 text-base font-medium leading-relaxed text-emerald-950/65 sm:text-xl">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Article & Sticky Sidebar ── */}
      <section className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Cover Photography Frame */}
            {post.cover_image && (
              <div className="relative aspect-video overflow-hidden border border-emerald-950/15 bg-[#fbfcfa] group">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Editorial Content Surface */}
            <article className="border-y border-emerald-950/15 bg-white p-6 sm:p-10 md:p-12">
              <div className="prose-custom max-w-none">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Social Share & Broadcast Bar */}
            <div className="flex flex-col items-center justify-between gap-5 border-y border-emerald-950/15 py-6 sm:flex-row sm:py-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-emerald-950/15 text-emerald-900">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-950 block">Share This Guide</span>
                  <span className="text-[11px] text-gray-500 font-medium">Forward to colleagues or travel coordinators</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button variant="outline" size="sm" className="w-full h-9 px-4 rounded-xl border-emerald-200 text-emerald-950 hover:bg-emerald-50 text-xs font-medium gap-1.5 cursor-pointer">
                    <span>WhatsApp</span>
                  </Button>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button variant="outline" size="sm" className="w-full h-9 px-4 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50 text-xs font-medium gap-1.5 cursor-pointer">
                    <span>LinkedIn</span>
                  </Button>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button variant="outline" size="sm" className="w-full h-9 px-4 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50 text-xs font-medium gap-1.5 cursor-pointer">
                    <span>Facebook</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Author Attribution Card */}
            <div className="flex items-center gap-5 border-l-2 border-amber-400 bg-white p-6 sm:p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-emerald-950 text-2xl font-heading font-medium text-white">
                {post.author.charAt(0)}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-700">
                  Verified Author
                </span>
                <h4 className="text-xl font-heading font-medium text-emerald-950 tracking-tight">{post.author}</h4>
                <p className="text-xs text-gray-600 font-medium">
                  Mobility Specialist & Executive Logistics Coordinator at Jinia Enterprise.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sticky Sidebar ── */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            {/* Quick Concierge Dispatch Card */}
            <div className="space-y-6 border-l-2 border-amber-400 bg-emerald-950 p-7 text-white sm:p-8">

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-amber-300">
                  Direct Concierge
                </span>
                <h3 className="text-2xl font-heading font-medium text-white tracking-tight leading-tight">
                  Book Your Ride in Dhaka
                </h3>
                <p className="text-xs text-emerald-100/75 font-medium leading-relaxed">
                  Need a reliable sedan, VIP Prado, or luxury microbus with a professional driver today?
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <Link href="/booking" className="block w-full">
                  <Button className="w-full h-12 bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-medium uppercase tracking-wider text-xs rounded-xl shadow-[0_12px_30px_-24px_rgba(6,52,38,.35)] shadow-amber-500/25 cursor-pointer">
                    <span>Reserve Vehicle Now</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>

                <a 
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Jinia%20Enterprise,%20I%20am%20reading%20"${encodeURIComponent(post.title)}"%20and%20would%20like%20to%20inquire%20about%20a%20car%20rental.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full h-12 border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium uppercase tracking-wider text-xs rounded-xl backdrop-blur-md cursor-pointer gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp Concierge</span>
                  </Button>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" />
                  Guaranteed Punctuality
                </span>
                <span>24/7 Helpline</span>
              </div>
            </div>

            {/* Related Recent Stories */}
            {relatedPosts.length > 0 && (
              <div className="space-y-5 border border-emerald-950/15 bg-white p-6 sm:p-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-700">
                    Latest Insights
                  </span>
                  <h3 className="text-xl font-heading font-medium text-emerald-950 tracking-tight">
                    Related Articles
                  </h3>
                </div>

                <div className="space-y-4 divide-y divide-gray-100">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block pt-4 first:pt-0 space-y-2 cursor-pointer"
                    >
                      <h4 className="font-heading font-medium text-sm text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(relatedPost.created_at)}
                        </span>
                        <span className="text-emerald-700">
                          {getReadingTime(relatedPost.content)} min
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── Bottom Quote & Callout ── */}
      <section className="container mt-20">
        <div className="border-l-2 border-amber-400 bg-emerald-950 p-8 text-center text-white sm:p-14 md:p-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-medium text-white leading-tight">
              Ready to Experience Dhaka&apos;s Premier Car Rental Service?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 font-medium max-w-xl mx-auto">
              Transparent rates, clean air-conditioned vehicles, and verified professional drivers ready at your schedule.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/vehicles">
                <Button size="lg" className="h-12 px-8 rounded-xl bg-linear-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-medium uppercase tracking-wider text-xs shadow-[0_18px_44px_-32px_rgba(6,52,38,.40)] cursor-pointer">
                  <span>Browse Available Fleet</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="h-12 px-6 rounded-xl border-white/20 text-white hover:bg-white/10 font-medium uppercase tracking-wider text-xs backdrop-blur-md cursor-pointer gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Call: {siteConfig.phone}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
