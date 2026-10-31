-- Rename vehicle slugs to the clean public URLs.
-- The site already serves the clean URLs and redirects the old ones
-- (lib/vehicles/slugs.ts + next.config.ts), so this can run at any time.
-- Order matters: free up "toyota-prado"/"toyota-noah"/"hyundai-h1" targets
-- only after the rows that would collide have been moved.
begin;
update vehicles set slug = 'toyota-land-cruiser-prado-2016-20' where slug = 'toyota-land-cruiser-prado-2012-15-copy-8zlbl';
update vehicles set slug = 'toyota-land-cruiser-prado-2012-15' where slug = 'toyota-prado';
update vehicles set slug = 'toyota-noah-2015-18'               where slug = 'toyota-x-noah-2015-18-ny98u';
update vehicles set slug = 'toyota-noah-2012-14'               where slug = 'toyota-noah';
update vehicles set slug = 'toyota-corolla-cross'              where slug = 'toyota-corolla-cross-jsbl1';
update vehicles set slug = 'hyundai-h1-2017-18'                where slug = 'hyundai-h1-new';
update vehicles set slug = 'hyundai-h1-2019-20'                where slug = 'hyundai-h1';
commit;
