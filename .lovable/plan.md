

## Fix Build Error + Store Form Submissions in localStorage

### What's wrong now
1. **Build error**: Line 78 has `parentName={...}` instead of `className={...}` — this is a typo causing the TypeScript error.
2. **No data storage**: The form just simulates a delay, shows a toast, and clears itself. No data is saved anywhere.

### What we'll do
Since there's no database connected yet, we'll store submissions in the browser's **localStorage**. This means:
- Every registration gets saved locally in the browser
- Data persists even if the page is refreshed
- You can view all registrations later (or export them)

Note: localStorage is per-device/browser only. When you're ready to collect registrations from real users across devices, we'd connect a database (like Supabase).

### Changes

**File: `src/components/RegistrationForm.tsx`**

1. Fix the typo on line 78: change `parentName={...}` to `className={...}` (this fixes the build error)
2. Add a localStorage helper to save submissions:
   - On successful form validation, read existing registrations from localStorage
   - Append the new entry (with a timestamp)
   - Save back to localStorage
   - Then show the success toast and reset the form

### Technical Details

Storage format in localStorage (key: `webinar_registrations`):
```json
[
  {
    "parentName": "Priya",
    "whatsapp": "9876543210",
    "email": "priya@example.com",
    "location": "Anna Nagar, Chennai",
    "registeredAt": "2026-02-06T10:30:00.000Z"
  }
]
```

