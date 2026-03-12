-- Run this SQL in your Supabase SQL Editor to fix the admin dashboard access
-- This adds a policy to allow the anonymous key to read registrations

-- Create a policy to allow reads for anonymous users (admin dashboard uses anon key)
CREATE POLICY "Allow anon reads" ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Allow the anon key to delete registrations as well. Be careful: this
-- effectively gives anyone with the client key the ability to remove rows.
-- In production you may want to restrict this further (e.g. by checking a
-- shared secret column or calling a function via a server-side role).
CREATE POLICY "Allow anon deletes" ON registrations
  FOR DELETE
  TO anon
  USING (true);
