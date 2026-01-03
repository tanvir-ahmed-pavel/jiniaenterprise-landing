"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleBlogPosts } from "@/lib/config";
import { Plus, Pencil, Trash2, FileText, Eye, EyeOff } from "lucide-react";

export default function BlogListPage() {
  const [posts, setPosts] = useState(sampleBlogPosts);

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.slug !== slug));
      // TODO: Delete from Supabase
    }
  };

  const togglePublish = (slug: string) => {
    setPosts(
      posts.map((p) =>
        p.slug === slug ? { ...p, is_published: !p.is_published } : p
      )
    );
    // TODO: Update in Supabase
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {posts.filter((p) => p.is_published !== false).length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <EyeOff className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {posts.filter((p) => p.is_published === false).length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Author</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">
                          {post.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{post.author}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          post.is_published !== false ? "success" : "secondary"
                        }
                        className="cursor-pointer"
                        onClick={() => togglePublish(post.slug)}
                      >
                        {post.is_published !== false ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${post.slug}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(post.slug)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {posts.length === 0 && (
        <Card className="p-12 text-center mt-4">
          <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first blog post
          </p>
          <Link href="/admin/blog/new">
            <Button>Create Post</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
