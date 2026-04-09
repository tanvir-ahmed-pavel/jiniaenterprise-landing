import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { Calendar, Clock, ArrowLeft, User, Share2, MessageSquare, Phone } from "lucide-react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

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

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author],
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
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

  // Simple markdown-like rendering for content with premium styling
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-3xl md:text-4xl font-heading font-black text-green-950 mt-12 mb-6 italic"
          >
            {line.replace("## ", "")}.
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-2xl font-heading font-black text-green-900 mt-10 mb-4 italic"
          >
            {line.replace("### ", "")}.
          </h3>
        );
      }
      // Lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 flex items-start gap-4 text-gray-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />
            <span className="text-lg font-medium leading-relaxed">{line.replace("- ", "")}</span>
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }
      // Paragraphs
      return (
        <p key={index} className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="pb-24">
      {/* Cinematic Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-green-50/50 via-white to-transparent -z-10" />
        
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Nav Back */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-green-600 hover:text-green-800 transition-all group"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>

            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-green-600/60">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-2 text-green-600">
                        <Clock className="h-3 w-3" />
                        {getReadingTime(post.content)} min read
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-green-950 leading-[0.9] italic tracking-tighter">
                    {post.title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl italic border-l-4 border-green-500/20 pl-8 py-2">
                    {post.excerpt}
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container">
        <div className="grid lg:grid-cols-12 gap-16 item-start">
          {/* Article Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Image - Artistic Frame */}
            <div className="glass-card aspect-video relative overflow-hidden bg-green-50 group">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl grayscale opacity-10 font-heading font-black italic">JINIA</div>
                )}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5" />
            </div>

            {/* Content Body */}
            <article className="max-w-none">
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Social Share — Glass Minimal */}
            <div className="glass-card p-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-black/[0.05]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-950 flex items-center justify-center text-white">
                        <Share2 className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-950">Broadcast Narrative</span>
                </div>
                <div className="flex gap-3">
                    {['X-Axis', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                        <Button 
                            key={platform}
                            variant="outline" 
                            size="sm"
                            className="h-10 px-6 rounded-xl border-green-100 text-green-950 hover:bg-green-50 font-black uppercase tracking-widest text-[9px]"
                        >
                            {platform}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Author Footer */}
            <div className="flex items-center gap-6 p-10 bg-green-50/50 rounded-[2rem] border border-green-100">
                <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center text-3xl font-heading font-black italic text-green-950">
                    {post.author.charAt(0)}
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Authored By</span>
                    <h4 className="text-xl font-heading font-black text-green-950 italic">{post.author}</h4>
                </div>
            </div>
          </div>

          {/* Sidebar — Sticky Elite */}
          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
            {/* Recent Stories */}
            {relatedPosts.length > 0 && (
              <div className="space-y-8">
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Fresh Perspective</span>
                    <h3 className="text-2xl font-heading font-black text-green-950 italic">Recent Stories.</h3>
                </div>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block space-y-3"
                    >
                      <h4 className="font-heading font-black text-lg text-green-950 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug italic">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-2"><Calendar className="h-3 w-3" /> {formatDate(relatedPost.created_at)}</span>
                        <span className="text-green-600/40">{getReadingTime(relatedPost.content)} MIN</span>
                      </div>
                      <div className="h-px w-full bg-black/[0.05] group-hover:bg-green-500/20 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Concierge Widget */}
            <div className="glass-dark p-10 bg-green-950 space-y-8 rounded-[2rem] shadow-2xl">
              <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-black text-white italic leading-tight">Elite Mobility <br /> Awaits.</h3>
                  <p className="text-sm text-white/50 font-medium leading-relaxed italic">
                    Why just read about excellence? Experience it firsthand with our premier concierge services.
                  </p>
              </div>
              <div className="space-y-3 pt-2">
                  <Link href="/booking">
                    <Button className="w-full h-14 bg-white text-green-950 hover:bg-green-50 gap-3 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl">
                        Reserve Space
                    </Button>
                  </Link>
                  <a href="https://wa.me/8801716633445" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full h-14 border-white/20 text-white hover:bg-white/10 gap-3 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl">
                        <MessageSquare className="h-4 w-4" /> WhatsApp Axis
                    </Button>
                  </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom Large CTA */}
      <section className="container mt-32">
        <div className="glass-card p-12 md:p-24 text-center bg-green-50/50 border-green-100 flex flex-col items-center gap-10">
            <h2 className="text-3xl md:text-6xl font-heading font-black text-green-950 italic leading-tight max-w-4xl">
              &ldquo;One Journey <span className="text-green-500/40">is all it takes</span> to see the difference.&rdquo;
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/vehicles">
                    <Button size="lg" className="h-16 px-12 rounded-2xl bg-green-950 text-white hover:bg-green-900 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
                        Browse The Collection
                    </Button>
                </Link>
                <a href="tel:8801716633445">
                    <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-green-200 text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px]">
                        <Phone className="mr-3 h-4 w-4" /> Personal Call
                    </Button>
                </a>
            </div>
        </div>
      </section>
    </div>
  );
}
