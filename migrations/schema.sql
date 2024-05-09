-- Create enum type for page status
CREATE TYPE page_status AS ENUM ('draft', 'published', 'archived', 'review');

-- Create enum type for widget status
CREATE TYPE widget_status AS ENUM ('active', 'archived');

-- Create enum type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  provider_id VARCHAR,
  email VARCHAR,
  role VARCHAR,
  created_at TIMESTAMP,
  last_accessed TIMESTAMP
);

-- Create language table
CREATE TABLE IF NOT EXISTS language (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  code VARCHAR NOT NULL
);

-- Create meta table
CREATE TABLE IF NOT EXISTS meta (
  id SERIAL PRIMARY KEY,
  language_id INT REFERENCES language(id) NOT NULL,
  title VARCHAR NOT NULL,
  meta_title VARCHAR NOT NULL,
  description VARCHAR,
  keywords VARCHAR[]
);

-- Create page table
CREATE TABLE IF NOT EXISTS page (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES page(id),
  meta_id INT REFERENCES meta(id),
  status page_status NOT NULL,
  slug VARCHAR NOT NULL,
  admin_name VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  published_at TIMESTAMP
);

-- Create widget table
CREATE TABLE IF NOT EXISTS widget (
  id SERIAL PRIMARY KEY,
  widget_template_id INT NOT NULL,
  widget_data_id INT,
  status widget_status NOT NULL,
  admin_name VARCHAR,
  admin_description VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create widget_data table
CREATE TABLE IF NOT EXISTS widget_data (
  id SERIAL PRIMARY KEY,
  language_id INT REFERENCES language(id) NOT NULL,
  data JSONB
);

-- Create page_widgets table
CREATE TABLE IF NOT EXISTS page_widgets (
  page_id INT REFERENCES page(id) NOT NULL,
  widget_id INT REFERENCES widget(id) NOT NULL,
  position INT NOT NULL
);

-- Add foreign key constraint to widget table
ALTER TABLE widget
ADD CONSTRAINT fk_widget_widget_data
FOREIGN KEY (widget_data_id)
REFERENCES widget_data(id);