
-- Фото товаров в каталоге
INSERT INTO t_p31537494_neptune_data_sync_1.cms_content (id, page, section, content_type, value) VALUES
  ('catalog_p1_image', 'catalog', 'p1_image', 'image', ''),
  ('catalog_p2_image', 'catalog', 'p2_image', 'image', ''),
  ('catalog_p3_image', 'catalog', 'p3_image', 'image', ''),
  ('catalog_p4_image', 'catalog', 'p4_image', 'image', ''),
  ('catalog_p5_image', 'catalog', 'p5_image', 'image', ''),
  ('catalog_p6_image', 'catalog', 'p6_image', 'image', '')
ON CONFLICT (id) DO NOTHING;

-- Видео на страницах
INSERT INTO t_p31537494_neptune_data_sync_1.cms_content (id, page, section, content_type, value) VALUES
  ('index_hero_video', 'index', 'hero_video', 'video', ''),
  ('about_video', 'about', 'about_video', 'video', ''),
  ('services_video', 'services', 'services_video', 'video', '')
ON CONFLICT (id) DO NOTHING;
