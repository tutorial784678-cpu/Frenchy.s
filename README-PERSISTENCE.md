# Frenchy's persistent product pricing

The customer site and admin panel now use `/api/products` for the product list. `localStorage` is only a cache/fallback; it is not the authoritative product database.

## Deploy on Vercel

1. Put `index.html`, `admin.html`, `api/`, `lib/`, `assets/`, `package.json`, and `supabase.sql` in the same Vercel project.
2. In Supabase SQL Editor, run `supabase.sql`.
3. In Vercel Project Settings → Environment Variables, add the values from `.env.example`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only; never put it in HTML)
   - `SESSION_SECRET`
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`
4. Redeploy.
5. Open `admin.html`, sign in, edit a product price, and save. The change is written to Supabase through `/api/products`.
6. Open `index.html` in another device/window. It polls every 5 seconds and will receive the new server price.

For an offline `file://` preview, the existing demo login still works, but permanent server saving is unavailable until the API is deployed.
