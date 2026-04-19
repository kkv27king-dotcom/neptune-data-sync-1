
INSERT INTO t_p31537494_neptune_data_sync_1.cms_content (id, page, section, content_type, value) VALUES
  ('site_company_name', 'global', 'company_name', 'text', 'КлиматПро'),
  ('site_logo_image', 'global', 'logo_image', 'image', '')
ON CONFLICT (id) DO NOTHING;
