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
    };
  };
}
