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
