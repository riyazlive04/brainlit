-- Run this SQL in your Supabase SQL Editor to fix the admin dashboard access
-- This adds a policy to allow the anonymous key to read registrations

-- Create a policy to allow reads for anonymous users (admin dashboard uses anon key)
CREATE POLICY "Allow anon reads" ON registrations
  FOR SELECT
  TO anon
  USING (true);
