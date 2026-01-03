export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: "Economy" | "Luxury" | "Bus";
          seats: number;
          features: string[];
          rental_types: string[];
          description: string;
          is_active: boolean;
          created_at: string;
          image_url: string | null; // Primary image mostly
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: "Economy" | "Luxury" | "Bus";
          seats: number;
          features?: string[];
          rental_types?: string[];
          description?: string;
          is_active?: boolean;
          created_at?: string;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category?: "Economy" | "Luxury" | "Bus";
          seats?: number;
          features?: string[];
          rental_types?: string[];
          description?: string;
          is_active?: boolean;
          created_at?: string;
          image_url?: string | null;
        };
      };
      vehicle_images: {
        Row: {
          id: string;
          vehicle_id: string;
          image_url: string;
          created_at?: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          image_url: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          image_url?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          vehicle_id: string | null;
          name: string;
          phone: string;
          email: string;
          message: string;
          rental_type: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id?: string | null;
          name: string;
          phone: string;
          email: string;
          message?: string;
          rental_type?: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          author?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          author?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          vehicle_id: string | null;
          vehicle_name: string | null;
          rental_type: string;
          pickup_date: string;
          return_date: string | null;
          pickup_location: string | null;
          message: string | null;
          status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          rental_type?: string;
          pickup_date: string;
          return_date?: string | null;
          pickup_location?: string | null;
          message?: string | null;
          status?:
            | "new"
            | "contacted"
            | "confirmed"
            | "completed"
            | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          rental_type?: string;
          pickup_date?: string;
          return_date?: string | null;
          pickup_location?: string | null;
          message?: string | null;
          status?:
            | "new"
            | "contacted"
            | "confirmed"
            | "completed"
            | "cancelled";
          created_at?: string;
        };
      };
    };
  };
}
