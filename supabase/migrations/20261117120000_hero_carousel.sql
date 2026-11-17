-- Migration: choose which cars appear in the homepage hero carousel.
-- Off by default, so nothing changes until an admin ticks a car.
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS show_in_hero BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN vehicles.show_in_hero IS 'Shown on the homepage hero carousel, in display position order';
