DROP TYPE IF EXISTS widget_status cascade;
DROP TYPE IF EXISTS user_role cascade;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;