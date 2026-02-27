import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Car Rental Tips & News",
  description:
    "Stay updated with the latest car rental tips, industry news, and travel guides from Jinia Enterprise - your trusted car rental partner in Dhaka.",
};

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
  const supabase = await createClient();
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

export default async function BlogPage() {
  const publishedPosts = await getBlogPosts();
  const featuredPost = publishedPosts[0];
  const otherPosts = publishedPosts.slice(1);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section — Glass Gradient */}
      <section className="py-16 md:py-24 section-glass">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-green-800">
              Blog & News
            </h1>
            <p className="text-lg text-gray-600">
              Stay informed with the latest tips, guides, and updates from the
              car rental industry.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <p className="text-gray-500 text-lg mb-4">
                No blog posts available yet. Check back soon for updates!
              </p>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post — Glass Card */}
            {featuredPost && (
              <section className="mb-16">
                <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-6">
                  Featured Article
                </h2>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Card className="overflow-hidden group">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto bg-gradient-to-br from-green-100/50 to-green-200/50 flex items-center justify-center min-h-[300px] overflow-hidden">
                        {featuredPost.cover_image ? (
                          <img
                            src={featuredPost.cover_image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="text-green-600/30 text-6xl font-heading font-bold">
                            📰
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredPost.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getReadingTime(featuredPost.content)} min read
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-4">
                          {featuredPost.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </span>
                          <span className="text-green-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                            Read More <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </section>
            )}

            {/* Other Posts Grid — Glass Cards */}
            {otherPosts.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-6">
                  Latest Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="h-full overflow-hidden group">
                        <div className="aspect-video bg-gradient-to-br from-green-50/50 to-green-100/50 flex items-center justify-center overflow-hidden">
                          {post.cover_image ? (
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-green-500/30 text-4xl font-heading font-bold">
                              📄
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getReadingTime(post.content)} min
                            </span>
                          </div>
                          <CardTitle className="text-lg group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                          <div className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                            Read More <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA — Glass Section */}
        <section className="mt-16 text-center py-12 glass-glow rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-green-800 mb-4">
            Need a Vehicle for Your Next Trip?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Browse our premium fleet and book your ride today for a comfortable
            and reliable journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <Button className="gap-2">
                View Our Fleet <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
