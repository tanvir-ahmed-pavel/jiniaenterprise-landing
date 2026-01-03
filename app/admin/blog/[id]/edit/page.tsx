"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleBlogPosts } from "@/lib/config";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<(typeof sampleBlogPosts)[0] | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const found = sampleBlogPosts.find((p) => p.slug === slug);
    if (found) {
      setPost(found);
      setContent(found.content || "");
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const postData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: content,
      author: formData.get("author") as string,
      is_published: formData.get("is_published") === "on",
    };

    // TODO: Update in Supabase
    console.log("Blog post data to update:", postData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Post updated! (Note: Database integration pending)");
    router.push("/admin/blog");
    setIsLoading(false);
  };

  if (!post) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Post not found</p>
          <Link href="/admin/blog">
            <Button className="mt-4">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update blog post content</p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={post.title}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" name="slug" defaultValue={post.slug} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={post.author} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                defaultValue={post.excerpt}
                className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono text-sm"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                defaultChecked={post.is_published !== false}
                className="h-4 w-4"
              />
              <Label htmlFor="is_published">Published</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Link href="/admin/blog">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
