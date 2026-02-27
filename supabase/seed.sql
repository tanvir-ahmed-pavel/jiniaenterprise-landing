-- =====================================================
-- DATABASE SEED DATA
-- Vehicles and Blog Posts with real image URLs
-- =====================================================

-- Clear existing data first
TRUNCATE TABLE vehicles CASCADE;
TRUNCATE TABLE blog_posts CASCADE;

-- =====================================================
-- VEHICLES SEED
-- =====================================================
INSERT INTO vehicles (name, slug, category, seats, engine_cc, features, rental_types, description, is_active, starting_price, price_label, image_url, images) 
VALUES
(
  'Hyundai H1', 'hyundai-h1', 'Economy', 9, 2497,
  ARRAY['Air Conditioning', 'Comfortable Seats', 'Large Cargo Space', 'Rear AC'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'A spacious 9-seater van perfect for group travel, airport transfers, and corporate transportation. Reliable and comfortable for city and outstation trips.', 
  true, 4500, 'per day',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80']
),
(
  'Hyundai H1 (New)', 'hyundai-h1-new', 'Luxury', 9, 2497,
  ARRAY['Premium Interior', 'Air Conditioning', 'USB Charging', 'Premium Audio'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'The latest model Hyundai H1 with premium features. First-hand vehicle maintained in excellent condition.', 
  true, 6000, 'per day',
  'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Alphard', 'toyota-alphard', 'Luxury', 7, 2494,
  ARRAY['Executive Seats', 'Premium Interior', 'Rear Entertainment', 'Privacy Glass', 'Captain Seats'], 
  ARRAY['Daily', 'Corporate'], 
  'The ultimate luxury MPV for VIP transport. First-class comfort with captain seats and premium amenities.', 
  true, 12000, 'per day',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Allion', 'toyota-allion', 'Economy', 5, 1797,
  ARRAY['Air Conditioning', 'Bluetooth Audio', 'Fuel Efficient', 'Comfortable Interior'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'A reliable and fuel-efficient sedan perfect for daily commuting and business travel.', 
  true, 3500, 'per day',
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Premio (F-Premio)', 'toyota-premio', 'Economy', 5, NULL,
  ARRAY['Air Conditioning', 'Spacious Interior', 'Fuel Efficient', 'Comfortable Ride'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Popular mid-size sedan known for comfort and reliability. Ideal for business and personal use.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Land Cruiser Prado', 'toyota-prado', 'Luxury', 7, NULL,
  ARRAY['Leather Seats', '4WD', 'Premium Audio', 'Climate Control', 'Sunroof'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'A premium SUV combining luxury and capability. Perfect for VIP transport, executive travel, and outstation trips.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Harrier', 'toyota-harrier', 'Luxury', 5, NULL,
  ARRAY['Premium Interior', 'Leather Seats', 'Advanced Safety', 'Hybrid Option'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Stylish luxury crossover SUV with premium features. Elegant design meets practical comfort.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Axio', 'toyota-axio', 'Economy', 5, NULL,
  ARRAY['Air Conditioning', 'Fuel Efficient', 'Compact Size', 'Easy Parking'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Compact and fuel-efficient sedan perfect for city driving. Easy to maneuver in Dhaka traffic.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Noah (X-Noah)', 'toyota-noah', 'Economy', 7, NULL,
  ARRAY['Air Conditioning', 'Spacious Interior', 'Sliding Doors', 'USB Charging'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'A versatile 7-seater MPV ideal for families and small groups. Plenty of luggage space and comfortable seating.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Corolla (X-Corolla / G-Corolla)', 'toyota-corolla', 'Economy', 5, NULL,
  ARRAY['Air Conditioning', 'Bluetooth Audio', 'USB Charging', 'Fuel Efficient'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'The world''s most popular sedan. Reliable, economical, and perfect for all occasions.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&auto=format&fit=crop&q=80']
),
(
  'Nissan X-Trail', 'nissan-xtrail', 'Luxury', 5, NULL,
  ARRAY['4WD', 'Spacious Interior', 'Advanced Safety', 'Premium Audio'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Versatile crossover SUV suitable for both city driving and adventurous outstation trips.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80']
),
(
  'Mitsubishi Pajero', 'mitsubishi-pajero', 'Luxury', 7, NULL,
  ARRAY['4WD', 'Powerful Engine', 'Off-road Capable', 'Premium Interior'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Legendary SUV known for durability and performance. Perfect for all terrain and long journeys.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80']
),
(
  'Hilux Double Cabin Pickup', 'hilux-pickup', 'Economy', 5, NULL,
  ARRAY['4WD', 'Pickup Bed', 'Durable Build', 'Off-road Capable'], 
  ARRAY['Daily', 'Weekly', 'Monthly', 'Corporate'], 
  'Rugged and reliable pickup truck. Ideal for cargo transport and rough terrain.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=80']
),
(
  'Toyota Hiace', 'toyota-hiace', 'Bus', 14, NULL,
  ARRAY['Air Conditioning', 'Comfortable Seats', 'Large Cargo Space', 'Sliding Doors'], 
  ARRAY['Daily', 'Corporate'], 
  'Popular 14-seater van for group transportation. Ideal for corporate staff transport and group tours.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1562620744-0527b8ce5e89?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1562620744-0527b8ce5e89?w=800&auto=format&fit=crop&q=80']
),
(
  '42 Seater A/C Bus (Nissan Civilian)', 'nissan-civilian-42', 'Bus', 42, NULL,
  ARRAY['Air Conditioning', 'Reclining Seats', 'PA System', 'Large Luggage Compartment'], 
  ARRAY['Daily', 'Corporate'], 
  'Full-size coach for large groups. Perfect for corporate events, office pickups, tours, and long-distance travel.', 
  true, NULL, 'per day',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80']
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  seats = EXCLUDED.seats,
  engine_cc = EXCLUDED.engine_cc,
  features = EXCLUDED.features,
  rental_types = EXCLUDED.rental_types,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  starting_price = EXCLUDED.starting_price,
  price_label = EXCLUDED.price_label,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images;

-- =====================================================
-- BLOG POSTS SEED
-- =====================================================
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, is_published, created_at, updated_at) 
VALUES
(
  'Top 5 Benefits of Monthly Car Rental for Corporate Clients', 
  'benefits-monthly-car-rental-corporate', 
  'Discover why more businesses are choosing monthly car rental services over traditional vehicle ownership for their corporate transportation needs.', 
  'Monthly car rental has become increasingly popular among corporate clients in Bangladesh. Here is why...

## Cost Efficiency
Monthly rentals eliminate the need for large capital investments in vehicle purchase, maintenance costs, and depreciation concerns.

## Flexibility
Easily scale your fleet up or down based on business needs without long-term commitments.

## Professional Service
Get access to professional chauffeurs and 24/7 support included in your rental package.

## Hassle-Free Maintenance
All maintenance, insurance, and documentation are handled by the rental company.

## Premium Fleet
Access to the latest vehicle models without the burden of ownership.', 
  'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop&q=80',
  'Jinia Enterprise', 
  true,
  '2026-01-02T10:00:00Z',
  '2026-01-02T10:00:00Z'
),
(
  'Complete Guide to Airport Transfers in Dhaka', 
  'airport-transfer-guide-dhaka', 
  'Everything you need to know about booking reliable airport transfers from Hazrat Shahjalal International Airport.', 
  'Planning your arrival or departure from Dhaka? Here is your complete guide to hassle-free airport transfers...

## Why Book in Advance?
Pre-booked airport transfers ensure a stress-free arrival with a professional driver waiting for you.

## Our Fleet Options
From economy sedans to luxury vehicles, we have the perfect vehicle for your needs.

## 24/7 Availability
Our airport transfer service operates round the clock to match your flight schedule.

## Meet & Greet Service
Our drivers will meet you at the arrival hall with a name board for easy identification.', 
  'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&auto=format&fit=crop&q=80',
  'Jinia Enterprise', 
  true,
  '2025-12-28T14:30:00Z',
  '2025-12-28T14:30:00Z'
),
(
  'Luxury Vehicle Rental: When to Choose Premium Transportation', 
  'luxury-vehicle-rental-guide', 
  'Learn when luxury vehicle rental makes sense for your business or personal needs, from VIP events to executive transport.', 
  'Luxury vehicle rental isn''t just about making a statement—it''s about providing the best experience...

## Corporate Executive Transport
First impressions matter. Impress your clients and partners with premium vehicles.

## Wedding & Special Events
Make your special day memorable with our luxury fleet including Toyota Alphard and Land Cruiser Prado.

## Embassy & Diplomatic Services
We specialize in providing secure, comfortable transport for diplomatic missions.

## Long-Distance Comfort
For outstation trips, our luxury SUVs offer unmatched comfort and reliability.', 
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'Jinia Enterprise', 
  true,
  '2025-12-20T09:15:00Z',
  '2025-12-20T09:15:00Z'
)
ON CONFLICT (slug) DO NOTHING;
