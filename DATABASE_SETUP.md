# CaffeineLab Database Setup Guide

## Quick Setup with Supabase (Free)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create a new project

### Step 2: Create Products Table

Go to SQL Editor in Supabase and run this:

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name_en VARCHAR(255) NOT NULL,
  name_ka VARCHAR(255),
  description_en TEXT,
  description_ka TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample product
INSERT INTO products (name_en, name_ka, description_en, description_ka, price, image) VALUES
('Lavazza Crema e Aroma', 'ლავაზა ქრემა ე არომა', 'Premium Italian bean coffee with rich, smooth flavor profile. Imported directly from EU. Perfect for espresso or regular brewing.', 'პრემიუმ იტალიური ყავის მარცვალი მდიდარი, გლუვი გემოთი. პირდაპირ ევროპიდან იმპორტირებული. ნიშიერი ან ჩვეულებრივი დასხმის მოსამზადებლად იდეალური.', 70, '☕');
```

### Step 3: Get API Keys
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Step 4: Update `.env.local`

Add to your `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 6: Access Admin Panel

After deploying:
- **Shop**: `yoursite.vercel.app/shop`
- **Admin**: `yoursite.vercel.app/admin`

## Add Your Products

In the Admin Panel (`/admin`):
1. Click "➕ Add New Product"
2. Fill in product details (English & Georgian)
3. Set price in Lari (₾)
4. Choose emoji icon
5. Click "✅ Add Product"

## That's it! 🎉

Your products are now live in the shop! Customers can see them and add to cart.

---

**Need help?** Check Supabase docs: https://supabase.com/docs
