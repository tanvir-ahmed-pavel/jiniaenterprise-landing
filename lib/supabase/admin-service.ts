import { createClient } from "./client";
import { Database } from "./types";

// Type aliases for convenience
type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
type VehicleInsert = Database["public"]["Tables"]["vehicles"]["Insert"];
type VehicleUpdate = Database["public"]["Tables"]["vehicles"]["Update"];

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

// Helper to check if Supabase is configured
const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

// =====================================================
// VEHICLES SERVICE
// =====================================================
export const vehicleService = {
  async getAll(): Promise<Vehicle[]> {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured - returning empty array");
      return [];
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }
    return (data as Vehicle[]) || [];
  },

  async getActive(): Promise<Vehicle[]> {
    if (!isSupabaseConfigured()) return [];
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error("Error fetching active vehicles:", error);
      return [];
    }
    return (data as Vehicle[]) || [];
  },

  async getById(id: string): Promise<Vehicle | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching vehicle by ID:", error);
      return null;
    }
    return data as Vehicle;
  },

  async getBySlug(slug: string): Promise<Vehicle | null> {
    if (!isSupabaseConfigured()) return null;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as Vehicle;
  },

  async create(vehicle: VehicleInsert): Promise<Vehicle | null> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - vehicle data:", vehicle);
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .insert(vehicle as never)
      .select()
      .single();

    if (error) {
      console.error("Error creating vehicle:", error);
      throw error;
    }
    return data as Vehicle;
  },

  async update(id: string, vehicle: VehicleUpdate): Promise<Vehicle | null> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - update data:", vehicle);
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .update(vehicle as never)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating vehicle:", error);
      throw error;
    }
    return data as Vehicle;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - would delete:", id);
      return false;
    }
    const supabase = createClient();
    const { error } = await supabase.from("vehicles").delete().eq("id", id);

    if (error) {
      console.error("Error deleting vehicle:", error);
      return false;
    }
    return true;
  },
};

// =====================================================
// BLOG POSTS SERVICE
// =====================================================
export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) return [];
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
    return (data as BlogPost[]) || [];
  },

  async getPublished(): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) return [];
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching published posts:", error);
      return [];
    }
    return (data as BlogPost[]) || [];
  },

  async getById(id: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching post by ID:", error);
      return null;
    }
    return data as BlogPost;
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) return null;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as BlogPost;
  },

  async create(post: BlogPostInsert): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - post data:", post);
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(post as never)
      .select()
      .single();

    if (error) {
      console.error("Error creating post:", error);
      throw error;
    }
    return data as BlogPost;
  },

  async update(id: string, post: BlogPostUpdate): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - update data:", post);
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .update(post as never)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating post:", error);
      throw error;
    }
    return data as BlogPost;
  },

  async togglePublish(id: string, isPublished: boolean): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const supabase = createClient();
    const { error } = await supabase
      .from("blog_posts")
      .update({ is_published: isPublished } as never)
      .eq("id", id);

    if (error) {
      console.error("Error toggling publish:", error);
      return false;
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
      return false;
    }
    return true;
  },
};

// =====================================================
// BOOKINGS SERVICE
// =====================================================
export const bookingService = {
  async getAll(): Promise<Booking[]> {
    if (!isSupabaseConfigured()) return [];
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
    return (data as Booking[]) || [];
  },

  async getById(id: string): Promise<Booking | null> {
    if (!isSupabaseConfigured()) return null;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Booking;
  },

  async updateStatus(id: string, status: Booking["status"]): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - would update status:", status);
      return false;
    }
    const supabase = createClient();
    const { error } = await supabase
      .from("bookings")
      .update({ status } as never)
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
      return false;
    }
    return true;
  },

  async update(id: string, booking: BookingUpdate): Promise<Booking | null> {
    if (!isSupabaseConfigured()) return null;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookings")
      .update(booking as never)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
    return data as Booking;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const supabase = createClient();
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      return false;
    }
    return true;
  },
};

// Export types for use in components
export type { Vehicle, VehicleInsert, VehicleUpdate };
export type { BlogPost, BlogPostInsert, BlogPostUpdate };
export type { Booking, BookingUpdate };
