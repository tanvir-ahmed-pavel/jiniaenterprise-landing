-- Clients, managed in admin, each with an optional testimonial. A
-- testimonial shows on the website only when testimonial_published is on.
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL DEFAULT 'Corporate',
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS testimonial_quote TEXT,
  ADD COLUMN IF NOT EXISTS testimonial_author TEXT,
  ADD COLUMN IF NOT EXISTS testimonial_role TEXT,
  ADD COLUMN IF NOT EXISTS testimonial_published BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'clients' AND policyname = 'Public can view active clients') THEN
    CREATE POLICY "Public can view active clients" ON public.clients FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'clients' AND policyname = 'Admin full access to clients') THEN
    CREATE POLICY "Admin full access to clients" ON public.clients FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- The current client list, each with draft wording to approve (unpublished).
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Thai Embassy', 'Embassy', 0, 'Our guests land, and the car is already at the rail. Every time.', 'Administration team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Thai Embassy');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Indonesian Embassy Dhaka', 'Embassy', 1, 'Official visits run on protocol time. Jinia keeps to it, down to the minute.', 'Administration team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Indonesian Embassy Dhaka');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Radio Foorti Ltd.', 'Corporate', 2, 'Early shows, late events, odd hours. The car turns up regardless.', 'Operations team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Radio Foorti Ltd.');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Lankan Alliance', 'Corporate', 3, 'Visiting colleagues get the same driver all week. That familiarity matters.', 'Admin team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Lankan Alliance');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Sajna', 'Corporate', 4, 'One call and the week’s transport is sorted. We stopped worrying about it.', 'Management'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Sajna');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'SK+F', 'Corporate', 5, 'Clean cars, careful drivers, and a coordinator who actually picks up the phone.', 'Admin department'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'SK+F');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Samsung', 'Corporate', 6, 'For visiting teams, reliability is everything. Jinia has been reliable.', 'General affairs'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Samsung');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Fair Distribution', 'Corporate', 7, 'Field visits outside Dhaka are planned properly: rest stops, timings, overnights.', 'Operations team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Fair Distribution');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Terre des Hommes', 'International Organization', 8, 'Our staff move safely between sites, and the drivers know the routes.', 'Logistics team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Terre des Hommes');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Kunhwa', 'Corporate', 9, 'Our engineers reach the site on time, every working day.', 'Project office'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Kunhwa');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'YoungDong Construction Co., Ltd.', 'Corporate', 10, 'A dedicated car and driver for our team, with backup when we need it.', 'Project office'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'YoungDong Construction Co., Ltd.');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Heerim Architects & Planners', 'Corporate', 11, 'Site to office to client meeting. The driver waits, and plans the route.', 'Dhaka office'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Heerim Architects & Planners');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Korea Expressway Corporation', 'Corporate', 12, 'Long days on the road with no surprises. That is what we need.', 'Project team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Korea Expressway Corporation');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Norwest Industries Ltd.', 'Corporate', 13, 'Buyers visiting the factory are picked up and dropped without a hitch.', 'Admin team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Norwest Industries Ltd.');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'Turk Kizilay', 'International Organization', 14, 'When plans change at short notice, Jinia changes with us.', 'Logistics team'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'Turk Kizilay');
INSERT INTO public.clients (name, type, sort_order, testimonial_quote, testimonial_author)
  SELECT 'KGS Sourcing', 'Corporate', 15, 'Monthly billing, a steady driver, no fuss. Exactly what we wanted.', 'Management'
  WHERE NOT EXISTS (SELECT 1 FROM public.clients WHERE name = 'KGS Sourcing');
