-- Migration: Add additional vehicle fields
-- Run after initial_schema.sql

-- Add engine_cc column
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS engine_cc INTEGER;

-- Add images array (multiple images)
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Add starting price in BDT
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS starting_price DECIMAL(10, 2);

-- Add price label (e.g., "per day", "per month")
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS price_label VARCHAR(50) DEFAULT 'per day';

-- Change description to support rich text (TEXT already supports it, just a comment)
COMMENT ON COLUMN vehicles.description IS 'Rich text description (HTML or Markdown)';

-- Update existing vehicles to use images array if image_url exists
UPDATE vehicles 
SET images = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND (images IS NULL OR array_length(images, 1) IS NULL);
