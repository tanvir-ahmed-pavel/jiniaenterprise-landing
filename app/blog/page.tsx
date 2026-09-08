import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";

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
          <div className="mx-auto max-w-xl py-28 text-center">
            <p className="flex items-center justify-center gap-3 type-label text-emerald-700">
              <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
              Nothing published yet
            </p>
            <p className="mt-6 text-base leading-relaxed text-emerald-950/60 sm:text-lg">
              We are writing the first guides now. In the meantime, the desk answers questions
              directly.
            </p>
            <div className="mt-9 flex justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
              >
                Request a vehicle
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-emerald-950/15 px-7 text-sm font-medium text-emerald-950 transition-colors hover:border-amber-400"
              >
                Back home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Lead story */}
            {featuredPost && (
              <section className="mb-24">
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-700">Featured reading</p>

                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid overflow-hidden border-y border-emerald-950/15 bg-white lg:grid-cols-2">
                      <div className="relative h-[320px] overflow-hidden bg-[#fbfcfa] lg:h-[500px]">
                        {featuredPost.cover_image ? (
                          <img
                            src={featuredPost.cover_image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-950/30">Jinia Journal</div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                      </div>
                      
                      <div className="flex flex-col justify-center space-y-8 p-8 sm:p-10 md:p-14">
                        <div className="flex flex-wrap items-center gap-5 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-700">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(featuredPost.created_at)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {getReadingTime(featuredPost.content)} min read
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-medium text-emerald-950 leading-tight group-hover:text-emerald-600 transition-colors duration-500">
                          {featuredPost.title}
                        </h3>
                        
                        <p className="text-base sm:text-lg text-emerald-950/60 font-medium leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between border-t border-emerald-950/10 pt-5">
                          <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950/55">By {featuredPost.author}</span>
                          <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950 transition-colors group-hover:text-emerald-600">
                            Read story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Other Posts Grid — Dynamic Bento Layout */}
            {otherPosts.length > 0 && (
              <section className="mb-32">
                <div className="mb-10 border-b border-emerald-950/15 pb-5"><p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-700">More from the journal</p></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, idx) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                      <div className="flex h-full flex-col overflow-hidden border border-emerald-950/15 bg-white transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-emerald-950/35" style={{ transitionDelay: `${idx * 0.05}s` }}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#fbfcfa]">
                          {post.cover_image ? (
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-950/30">Jinia Journal</div>
                          )}
                          <div className="absolute left-4 top-4">
                            <span className="border-l-2 border-amber-400 bg-white/90 py-1 pl-2.5 pr-3 text-[9px] font-medium uppercase tracking-[0.05em] text-emerald-950">
                              {formatDate(post.created_at)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-1 flex-col gap-6 p-6">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-heading font-medium text-emerald-950 leading-tight group-hover:text-emerald-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-emerald-950/60 font-medium leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center justify-between border-t border-emerald-950/10 pt-5">
                                <span className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.05em] text-emerald-950/45">
                                    <Clock className="h-3 w-3" /> {getReadingTime(post.content)} Min
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950 transition-colors group-hover:text-emerald-600">
                                    Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
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

        <section className="border-l-2 border-amber-400 bg-emerald-950 px-8 py-14 text-center text-white md:px-16 md:py-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-medium leading-tight">
              Ready for your next destination?
            </h2>
            <p className="text-white/65 font-medium text-base leading-relaxed">
                Experience the gold standard of concierge mobility in Bangladesh. Our fleet is ready when you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/vehicles">
                <Button size="lg" className="h-12 px-7 rounded-lg bg-white text-emerald-950 hover:bg-emerald-50 font-medium uppercase tracking-[0.05em] text-[10px]">
                    Explore The Fleet
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-7 rounded-lg border-white/30 text-white hover:bg-white/10 font-medium uppercase tracking-[0.05em] text-[10px]">
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
