import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, ArrowRight, User, MousePointer2 } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Journal | Jinia Enterprise",
  description:
    "Stay updated with the latest car rental tips, industry news, and travel guides from Jinia Enterprise — your trusted car rental partner in Dhaka.",
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
    <div className="pb-24">
      <PageHeader 
        title="The Journal."
        subtitle="Travel Narratives"
        description="Bespoke stories, industry insights, and curated travel guides designed for the modern elite traveler in Bangladesh."
        breadcrumbs={[{ label: "Journal" }]}
      />

      <div className="container">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-32">
            <div className="glass-card p-16 max-w-2xl mx-auto space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Pending Update</span>
              <p className="text-gray-500 text-lg font-medium leading-relaxed italic">
                Our latest travel narratives are being curated. <br /> Check back soon for fresh insights.
              </p>
              <Link href="/">
                <Button variant="outline" className="h-14 px-10 rounded-2xl border-green-100 text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px]">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post — Cinematic Glass Card */}
            {featuredPost && (
              <section className="mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                  <div className="space-y-4">
                    <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">The Spotlight</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 italic">Featured <span className="text-green-500/40">Story.</span></h2>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="glass-card overflow-hidden bg-white/40 border-white/60">
                    <div className="grid lg:grid-cols-2">
                      <div className="aspect-video lg:aspect-auto bg-green-50 relative overflow-hidden h-[400px] lg:h-[500px]">
                        {featuredPost.cover_image ? (
                          <img
                            src={featuredPost.cover_image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10rem] grayscale opacity-10">📰</div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                      </div>
                      
                      <div className="p-10 md:p-16 flex flex-col justify-center space-y-8">
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-green-600">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(featuredPost.created_at)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {getReadingTime(featuredPost.content)} min read
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-black text-green-950 leading-tight italic group-hover:text-green-600 transition-colors duration-500">
                          {featuredPost.title}.
                        </h3>
                        
                        <p className="text-lg text-gray-500 font-medium leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        <div className="pt-4 flex items-center justify-between border-t border-black/[0.05]">
                          <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-green-950">
                            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[10px]">
                                {featuredPost.author.charAt(0)}
                            </span>
                            {featuredPost.author}
                          </span>
                          <span className="text-green-700 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
                            Unfold Story <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Other Posts Grid — Dynamic Bento Layout */}
            {otherPosts.length > 0 && (
              <section className="mb-32">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                  <div className="space-y-4">
                    <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">Latest Narratives</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 italic">Recent <span className="text-green-500/40">Articles.</span></h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, idx) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                      <div className="glass-card flex flex-col h-full bg-white/40 border-white/60 overflow-hidden hover:-translate-y-2 transition-all duration-500" style={{ transitionDelay: `${idx * 0.05}s` }}>
                        <div className="aspect-[16/10] bg-green-50 relative overflow-hidden">
                          {post.cover_image ? (
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl grayscale opacity-10">📄</div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-green-950 border border-white/40">
                              {formatDate(post.created_at)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-8 flex-1 flex flex-col gap-6">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-heading font-black text-green-950 italic leading-tight group-hover:text-green-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-black/[0.03] flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <Clock className="h-3 w-3" /> {getReadingTime(post.content)} Min
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-950 group-hover:text-green-600 flex items-center gap-2 transition-all">
                                    Full Story <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Cinematic CTA — Artistic Layout */}
        <section className="relative glass-dark p-12 md:p-24 text-center overflow-hidden rounded-[3rem] sm:rounded-[4rem]">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[20rem] font-heading font-black italic whitespace-nowrap">FLEET</span>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-6xl font-heading font-black text-white italic leading-tight">
              Ready for Your <br /> <span className="text-green-400">Next Destination?</span>
            </h2>
            <p className="text-white/50 font-medium text-lg leading-relaxed italic">
                Experience the gold standard of concierge mobility in Bangladesh. Our fleet is ready when you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/vehicles">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
                    Explore The Fleet
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[10px]">
                    Consult Concierge
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
