
CREATE TABLE IF NOT EXISTS t_p31537494_neptune_data_sync_1.cms_content (
  id VARCHAR(100) PRIMARY KEY,
  page VARCHAR(50) NOT NULL,
  section VARCHAR(100) NOT NULL,
  content_type VARCHAR(20) NOT NULL DEFAULT 'text',
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p31537494_neptune_data_sync_1.admin_sessions (
  token VARCHAR(64) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '7 days'
);

INSERT INTO t_p31537494_neptune_data_sync_1.cms_content (id, page, section, content_type, value) VALUES
  ('index_hero_title', 'index', 'hero_title', 'text', 'Климат под контролем'),
  ('index_hero_subtitle', 'index', 'hero_subtitle', 'text', 'Продажа, монтаж и обслуживание кондиционеров в Хабаровске. Официальный дилер Daikin, Mitsubishi Electric, Samsung.'),
  ('index_hero_image', 'index', 'hero_image', 'image', ''),
  ('services_title', 'services', 'hero_title', 'text', 'Всё что нужно'),
  ('services_subtitle', 'services', 'hero_subtitle', 'text', 'Полный цикл: от подбора оборудования до регулярного обслуживания. Один подрядчик — ноль забот.'),
  ('about_title', 'about', 'hero_title', 'text', 'О компании'),
  ('about_subtitle', 'about', 'hero_subtitle', 'text', 'КлиматПро — ваш надёжный партнёр в создании комфортного климата'),
  ('about_image', 'about', 'hero_image', 'image', ''),
  ('contacts_phone', 'contacts', 'phone', 'text', '+7 (924) 935-83-88'),
  ('contacts_address', 'contacts', 'address', 'text', 'г. Хабаровск, ул. Слободская, 16'),
  ('contacts_email', 'contacts', 'email', 'text', 'info@klimatpro.ru')
ON CONFLICT (id) DO NOTHING;
