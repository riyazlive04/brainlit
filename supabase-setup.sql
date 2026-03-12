-- Create registrations table in Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the registrations table
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  parent_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL,
  meeting_link TEXT DEFAULT '',
  webinar_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy to allow reads for anonymous users (admin dashboard uses anon key)
CREATE POLICY "Allow anon reads" ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create a policy to allow reads for authenticated users
CREATE POLICY "Allow authenticated reads" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create an index on email for faster lookups
CREATE INDEX idx_registrations_email ON registrations(email);

-- Create an index on registered_at for sorting
CREATE INDEX idx_registrations_registered_at ON registrations(registered_at DESC);

-- NOTE: if you are adding new columns to an existing database, run the
-- following manually in the Supabase SQL editor:
-- ALTER TABLE registrations
--   ADD COLUMN webinar_date TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- ALTER TABLE registrations
--   ADD COLUMN meeting_link TEXT DEFAULT '';
-- you may also want to create indexes:
-- CREATE INDEX idx_registrations_webinar_date ON registrations(webinar_date DESC);
-- CREATE INDEX idx_registrations_meeting_link ON registrations(meeting_link);
--
-- For webinar_settings table changes:
-- ALTER TABLE webinar_settings
--   ADD COLUMN meeting_link TEXT DEFAULT '';
