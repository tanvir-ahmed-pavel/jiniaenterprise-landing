"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { blogService } from "@/lib/supabase/admin-service";

export default function AddBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .substring(0, 50);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const manualSlug = formData.get("slug") as string;

    // Ensure slug is unique-ish by adding timestamp if identical?
    // Supabase will error if collision on unique constraint.
    const slug = manualSlug || generateSlug(title);

    const blogData = {
      title: title,
      slug: slug,
      excerpt: formData.get("excerpt") as string,
      content: content,
      cover_image: (formData.get("cover_image") as string) || null,
      author: (formData.get("author") as string) || "Jinia Enterprise",
      is_published: formData.get("is_published") === "on",
    };

    try {
      await blogService.create(blogData);
      alert("Blog post created successfully!");
      router.push("/admin/blog"); // Redirect to blog list
    } catch (error) {
      console.error("Failed to create blog post:", error);
      alert(
        "Failed to create blog post. Please try again (maybe slug collision?).",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Create Blog Post</h1>
            <p className="text-sm opacity-80">Write a new article</p>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
            <CardDescription>
              Create a new blog post for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="auto-generated-from-title"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to auto-generate from title
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Jinia Enterprise"
                    defaultValue="Jinia Enterprise"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={2}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                  placeholder="Brief summary shown in listings..."
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
                  placeholder="Write your post content here...

Use markdown formatting:
## Heading 2
### Heading 3

Regular paragraph text.

- Bullet point
- Another point

**Bold text** and *italic text*"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Supports basic markdown formatting
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_image">Cover Image URL</Label>
                <Input
                  id="cover_image"
                  name="cover_image"
                  placeholder="/images/blog/post-cover.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  name="is_published"
                  defaultChecked
                  className="h-4 w-4"
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Publish Post"
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
    </div>
  );
}
