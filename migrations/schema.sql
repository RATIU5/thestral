-- Create the hstore extension
CREATE EXTENSION IF NOT EXISTS hstore;

-- Create enum type for page status
CREATE TYPE page_status AS ENUM ('draft', 'published', 'archived', 'review');

-- Create enum type for widget status
CREATE TYPE widget_status AS ENUM ('active', 'archived');

-- Create enum type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- Create language table
CREATE TABLE IF NOT EXISTS language (
  code VARCHAR PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);

-- Add default language
INSERT INTO
  language (name, code)
VALUES
  ('English', 'en');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  role user_role NOT NULL,
  language_code VARCHAR REFERENCES language(code) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  last_accessed TIMESTAMP NOT NULL
);

-- Create meta table
CREATE TABLE IF NOT EXISTS meta (
  id SERIAL PRIMARY KEY,
  language_code VARCHAR REFERENCES language(code) NOT NULL,
  title VARCHAR NOT NULL,
  meta_title VARCHAR NOT NULL,
  description VARCHAR,
  keywords VARCHAR []
);

-- Create page table
CREATE TABLE IF NOT EXISTS page (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES page(id),
  meta_ids hstore,
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
  widget_data_ids hstore,
  status widget_status NOT NULL,
  admin_name VARCHAR,
  admin_description VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create widget_data table
CREATE TABLE IF NOT EXISTS widget_data (
  id SERIAL PRIMARY KEY,
  language_code VARCHAR REFERENCES language(code) NOT NULL,
  data JSONB
);

-- Create page_widgets table
CREATE TABLE IF NOT EXISTS page_widgets (
  page_id INT REFERENCES page(id) NOT NULL,
  widget_id INT REFERENCES widget(id) NOT NULL,
  position INT NOT NULL
);