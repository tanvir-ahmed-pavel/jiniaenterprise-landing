import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { Calendar, Clock, ArrowLeft, User, Share2 } from "lucide-react";
import type { Metadata } from "next";

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
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-heading font-bold text-gray-900 mt-8 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-heading font-bold text-gray-800 mt-6 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 list-disc text-gray-700 mb-2">
            {line.replace("- ", "")}
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }
      // Paragraphs
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-green-50 via-white to-green-50 py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getReadingTime(post.content)} min read
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Featured Image */}
              <div className="aspect-video rounded-xl bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center mb-10 overflow-hidden">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-green-500/40 text-6xl">📰</div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Share2 className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">
                      Share this article
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-green-50 rounded-2xl text-center">
                <h3 className="text-2xl font-heading font-bold text-green-800 mb-4">
                  Ready to Book?
                </h3>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Experience premium car rental service with Jinia Enterprise.
                  Contact us today for a quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/vehicles">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Browse Vehicles
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="p-4 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all">
                            <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 text-sm">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(relatedPost.created_at)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Contact */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                    Need a Vehicle?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Call us for immediate assistance or browse our fleet online.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
