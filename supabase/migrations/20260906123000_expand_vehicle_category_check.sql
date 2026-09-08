-- Keep the deployed fleet compatible with the admin form and existing Luxury rows.
ALTER TABLE public.vehicles
  DROP CONSTRAINT IF EXISTS vehicles_category_check;

ALTER TABLE public.vehicles
  ADD CONSTRAINT vehicles_category_check
  CHECK (category IN ('Economy', 'Luxury', 'Standard', 'Premium', 'SUV', 'Microbus', 'Bus'));
