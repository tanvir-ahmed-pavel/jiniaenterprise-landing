import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleBlogPosts } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  created_at: string;
}

async function getLatestPosts(): Promise<BlogPostItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, author, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback to curated sample posts
  }

  return sampleBlogPosts.slice(0, 3);
}

export async function HomeBlogSection() {
  const posts = await getLatestPosts();

  if (!posts || posts.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-transparent via-emerald-950/[0.03] to-transparent relative overflow-hidden">
      <div className="container relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-emerald-900/10 pb-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 shadow-2xs">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span>The Journal & Travel Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-tight">
              Latest Insights & <span className="text-gradient-emerald">Rental Guides.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Expert advice on Dhaka airport pickups, corporate commute fleets, and highway journeys.
            </p>
          </div>

          <Link href="/blog" className="shrink-0">
            <Button
              variant="outline"
              className="h-11 px-5 rounded-xl border-emerald-200 text-emerald-950 hover:bg-emerald-50 gap-2 font-bold text-xs uppercase tracking-wider shadow-2xs"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 3 Column Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group/blog flex flex-col h-full rounded-3xl overflow-hidden border border-white/80 bg-white/80 hover:bg-white hover:border-emerald-300/80 transition-all duration-300 shadow-[0_4px_24px_-4px_rgba(10,25,18,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15)] transform-gpu"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-emerald-950/10">
                <img
                  src={post.cover_image || "/images/blog/corporate-rental.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover/blog:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950/60 via-transparent to-transparent opacity-60 group-hover/blog:opacity-40 transition-opacity" />
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-3">
                  {/* Meta Strip */}
                  <div className="flex items-center gap-3 text-xs font-semibold text-emerald-700">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.created_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      3 min read
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
                    <h3 className="text-lg sm:text-xl font-heading font-black text-emerald-950 group-hover/blog:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read CTA */}
                <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 group-hover/blog:text-emerald-700 focus:outline-none"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/blog:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] font-semibold text-gray-400">By {post.author || "Jinia"}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
