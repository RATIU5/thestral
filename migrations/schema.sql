-- Create enum type for page status
CREATE TYPE page_status AS ENUM ('draft', 'published', 'archived', "review");

-- Create enum type for widget status
CREATE TYPE widget_status AS ENUM ('active', 'archived');

-- Create enum type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  provider_id VARCHAR,
  email VARCHAR,
  role VARCHAR,
  created_at TIMESTAMP,
  last_accessed TIMESTAMP
);

-- Create language table
CREATE TABLE language (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  code VARCHAR
);

-- Create meta table
CREATE TABLE meta (
  id SERIAL PRIMARY KEY,
  language_id INT REFERENCES language(id),
  title VARCHAR,
  meta_title VARCHAR,
  description VARCHAR,
  keywords VARCHAR[]
);

-- Create page table
CREATE TABLE page (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES page(id),
  meta_id INT REFERENCES meta(id),
  status page_status,
  path VARCHAR,
  admin_name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  published_at TIMESTAMP
);

-- Create widget table
CREATE TABLE widget (
  id SERIAL PRIMARY KEY,
  widget_template_id INT,
  widget_data_id INT,
  status widget_status,
  admin_name VARCHAR,
  admin_description VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Create widget_data table
CREATE TABLE widget_data (
  id SERIAL PRIMARY KEY,
  language_id INT REFERENCES language(id),
  data JSONB
);

-- Create page_widgets table
CREATE TABLE page_widgets (
  page_id INT REFERENCES page(id),
  widget_id INT REFERENCES widget(id),
  position INT
);

-- Add foreign key constraint to widget table
ALTER TABLE widget
ADD CONSTRAINT fk_widget_widget_data
FOREIGN KEY (widget_data_id)
REFERENCES widget_data(id);