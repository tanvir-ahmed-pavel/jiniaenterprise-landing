-- Supabase Schema for Jinia Enterprise
-- Run this in your Supabase SQL Editor

-- =====================================================
-- VEHICLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Economy', 'Luxury', 'Bus')),
  seats INTEGER NOT NULL DEFAULT 4,
  features TEXT[] DEFAULT '{}',
  rental_types TEXT[] DEFAULT ARRAY['Daily', 'Weekly', 'Monthly'],
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active vehicles
CREATE POLICY "Public can view active vehicles" ON vehicles
  FOR SELECT USING (is_active = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Admin full access to vehicles" ON vehicles
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(100) DEFAULT 'Jinia Enterprise',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Admin full access to blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_name VARCHAR(255),
  rental_type VARCHAR(50) DEFAULT 'daily' CHECK (rental_type IN ('daily', 'weekly', 'monthly', 'corporate', 'airport')),
  pickup_date DATE NOT NULL,
  return_date DATE,
  pickup_location VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can view/manage bookings
CREATE POLICY "Admin full access to bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anyone to insert bookings (public booking form)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- INQUIRIES TABLE (existing)
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can view inquiries
CREATE POLICY "Admin full access to inquiries" ON inquiries
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anyone to submit inquiries
CREATE POLICY "Anyone can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- UPDATED AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - uncomment to use)
-- =====================================================

-- INSERT INTO vehicles (name, slug, category, seats, features, rental_types, description, is_active) VALUES
-- ('Toyota Corolla', 'toyota-corolla', 'Economy', 5, ARRAY['AC', 'Bluetooth', 'GPS'], ARRAY['Daily', 'Weekly', 'Monthly'], 'Reliable economy sedan', true),
-- ('Toyota Alphard', 'toyota-alphard', 'Luxury', 7, ARRAY['AC', 'Leather Seats', 'Entertainment System', 'WiFi'], ARRAY['Daily', 'Corporate', 'Airport'], 'Premium luxury MPV', true);

-- INSERT INTO blog_posts (title, slug, excerpt, content, author, is_published) VALUES
-- ('Benefits of Monthly Car Rental', 'benefits-monthly-car-rental', 'Discover the advantages of monthly car rental services.', 'Full article content here...', 'Jinia Enterprise', true);
