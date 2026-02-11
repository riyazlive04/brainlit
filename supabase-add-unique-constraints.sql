-- Run this SQL in your Supabase SQL Editor to add unique constraints
-- This prevents duplicate registrations with the same WhatsApp or Email

-- Add unique constraint on whatsapp column
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_whatsapp_unique UNIQUE (whatsapp);

-- Add unique constraint on email column
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_email_unique UNIQUE (email);
