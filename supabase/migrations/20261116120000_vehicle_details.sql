-- Migration: extra vehicle details shown in the public fleet drawer and
-- edited in the admin panel. All nullable, so existing rows need no backfill.
-- Run after the earlier migrations.

ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS model_year INTEGER;
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS transmission VARCHAR(20);
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS fuel_type VARCHAR(20);
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS colour VARCHAR(40);
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS luggage_bags INTEGER;
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS insurance TEXT;

COMMENT ON COLUMN vehicles.transmission IS 'Automatic or Manual';
COMMENT ON COLUMN vehicles.fuel_type IS 'Petrol, Diesel, CNG, Hybrid or Electric';
COMMENT ON COLUMN vehicles.luggage_bags IS 'Number of large bags the boot takes';
COMMENT ON COLUMN vehicles.insurance IS 'Short note on the insurance cover shown to customers';
