import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { sampleBlogPosts } from "@/lib/config";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Car Rental Tips & News",
  description:
    "Stay updated with the latest car rental tips, industry news, and travel guides from Jinia Enterprise - your trusted car rental partner in Dhaka.",
};

export default function BlogPage() {
  const publishedPosts = sampleBlogPosts.filter((post) => post.is_published);
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
      {/* Hero Section */}
      <section className="bg-linear-to-br from-green-50 via-white to-green-50 py-16 md:py-24">
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
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-6">
              Featured Article
            </h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-green-100">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Placeholder */}
                  <div className="aspect-video md:aspect-auto bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center min-h-[300px]">
                    <div className="text-green-600/50 text-6xl font-heading font-bold">
                      📰
                    </div>
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
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </span>
                      <span className="text-green-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </section>
        )}

        {/* Other Posts Grid */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-6">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group border-green-100 hover:border-green-300">
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center">
                      <div className="text-green-500/40 text-4xl font-heading font-bold">
                        📄
                      </div>
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
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 text-center py-12 bg-green-50 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-green-800 mb-4">
            Need a Vehicle for Your Next Trip?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Browse our premium fleet and book your ride today for a comfortable
            and reliable journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                View Our Fleet <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
