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

-- Insert CaffeineLab Products
INSERT INTO products (name_en, name_ka, description_en, description_ka, price, image) VALUES
('Lavazza Crema e Aroma', 'ლავაზა კრემა ე არომა', 'Premium Italian bean coffee with rich, smooth flavor profile. Imported directly from EU. Perfect for espresso or regular brewing.', 'პრემიუმ იტალიური ყავის მარქვალი, გლუფი გემოტი. პირდაპირ ევროპიდან იმპორტირებული. მნიშვნელი ან ჩვეულებრივი დაშხმისთვის იდეალური.', 70, '☕'),
('Lavazza Crema e Gusto Classico', 'ლავაზა კრემა ე გუსტო კლასიკო', 'Classic Italian blend with balanced taste and smooth crema. Timeless favorite for coffee lovers. Imported from EU.', 'კლასიკური იტალიური ღია, დაბალანსებული გემოთი და გლუფი კრემით. ძველი ოჩეჩი ყავის მოყვარულთათვის. ევროპიდან იმპორტირებული.', 70, '☕'),
('Lavazza Super Crema', 'ლავაზა სუპერ კრემა', 'Premium blend with notes of hazelnut and brown sugar. Creates perfect crema for espresso. Premium quality from Italy.', 'პრემიუმ ღია ნიჟარის და ყავიანი შაქრის ტონებით. იდეალური ფოამი ესპრესოსთვის. იტალიური ხარისხი.', 75, '☕'),
('Lavazza Rosa Espresso', 'ლავაზა როზა ესპრესო', 'Smooth and aromatic espresso blend with mild flavor. Perfect for daily coffee enjoyment. Imported from Italy.', 'გლუფი და არომატული ესპრესო ღია მხოლოდ გემოთი. ყოველდღიური ყავის სიამოვნებისთვის სრულყოფილი. იტალიით იმპორტირებული.', 70, '☕'),
('Lavazza Espresso Italiano Cremoso', 'ლავაზა ესპრესო იტალიანო კრემოზო', 'Creamy Italian espresso with rich body and full flavor. Perfect crema for true espresso lovers. Premium EU import.', 'კრემიანი იტალიური ესპრესო მდიდარი სხეულით და სრული გემოთი. სამართავი ესპრესო მოყვარულთათვის. პრემიუმ ევროპული იმპორტი.', 75, '☕'),
('Lavazza Espresso Barista', 'ლავაზა ესპრესო ბარისტა', 'Professional barista-grade espresso blend with intense flavor and perfect crema. Ideal for espresso machines. From Italy.', 'პროფესიონალური ბარისტა-კლასის ესპრესო ღია ინტენსიური გემოთი. ესპრესო მანქანებისთვის იდეალური. იტალიის კოფერ.', 75, '☕'),
('Illy Intense', 'ილი ინტენსი', 'Premium ground coffee with intense, bold flavor. 250g pack. Perfect for filter coffee and espresso. From EU.', 'პრემიუმ დაფქული ყავა ინტენსიური, დამამშვიდებელი გემოთი. 250გ პაკი. ფილტრისა და ესპრესოს ყავისთვის სამართავი. ევროპიდან.', 30, '☕'),
('Dallmayr Prodomo Intensiv', 'დალმაიერი პროდომო ინტენსივი', 'German quality ground coffee with intense taste. 500g pack. Premium roast for strong coffee lovers. Imported from Germany.', 'გერმანული ხარისხის დაფქული ყავა ინტენსიური გემოთი. 500გ პაკი. პრემიუმ როსტი ძლიერი ყავის მოყვარულებისთვის. გერმანიის იმპორტი.', 35, '☕'),
('Dallmayr Prodomo', 'დალმაიერი პროდომო', '100% Arabica ground coffee with smooth, balanced flavor. 500g pack. Premium German quality. Perfect for daily brewing.', '100% არაბიკა დაფქული ყავა გლუფი, დაბალანსებული გემოთი. 500გ პაკი. პრემიუმ გერმანული ხარისხი. ყოველდღიური დასხმისთვის იდეალური.', 35, '☕');
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

### Step 6: Redeploy on Vercel

After adding environment variables, trigger a redeploy on Vercel.

### Step 7: Access Your Site

- **Shop**: `yoursite.vercel.app/shop` - See all 9 products!
- **Admin**: `yoursite.vercel.app/admin` - Add/edit/delete products

## Your Products Ready! 🎉

✅ Lavazza Crema e Aroma (70 lari/kg)  
✅ Lavazza Crema e Gusto Classico (70 lari/kg)  
✅ Lavazza Super Crema (75 lari/kg)  
✅ Lavazza Rosa Espresso (70 lari/kg)  
✅ Lavazza Espresso Italiano Cremoso (75 lari/kg)  
✅ Lavazza Espresso Barista (75 lari/kg)  
✅ Illy Intense (30 lari/250g)  
✅ Dallmayr Prodomo Intensiv (35 lari/500g)  
✅ Dallmayr Prodomo (35 lari/500g)  

---

**Need help?** Check Supabase docs: https://supabase.com/docs
