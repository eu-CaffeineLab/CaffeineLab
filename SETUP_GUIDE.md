# CaffeineLab Production Setup Guide

Follow these steps in order to make your site ready for real orders.

---

## STEP 1: Set Up Supabase Database (5 minutes)

### 1.1 Create Supabase Account
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up (you can use GitHub or email)
4. Create a new project (pick any region)
5. Wait for it to be ready (takes ~1-2 minutes)

### 1.2 Create Tables in Supabase
1. Once your project is ready, click **"SQL Editor"** on the left
2. Copy and paste this SQL code:

```sql
-- Create products table
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

-- Create orders table
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  delivery_address TEXT NOT NULL,
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  order_status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name_en, name_ka, description_en, description_ka, price, image) VALUES
('Lavazza Crema e Aroma', 'ლავაზა კრემა ე არომა', 'Premium Italian bean coffee with rich, smooth flavor profile', 'პრემიუმ იტალიური ყავა', 70.00, '/coffee1.jpg'),
('Lavazza Crema e Gusto', 'ლავაზა კრემა ე გუსტო', 'Classic Italian blend with balanced taste', 'კლასიკური ბმია', 70.00, '/coffee2.jpg'),
('Lavazza Super Crema', 'ლავაზა სუპერ კრემა', 'Premium blend with hazelnut notes', 'პრემიუმ ფხვნილი', 75.00, '/coffee3.jpg'),
('Illy Intense', 'ილი ინტენსი', 'Intense bold flavor ground coffee', 'ღრმა ადაგო', 30.00, '/coffee4.jpg');
```

3. Click **"Run"** to execute the SQL

### 1.3 Get Your Supabase Keys
1. Click **"Settings"** in the left menu
2. Click **"API"**
3. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** (looks like `eyJhbGc...`)
4. Save them somewhere safe - you'll need them in a moment

---

## STEP 2: Set Up Stripe (5 minutes)

### 2.1 Create Stripe Account
1. Go to https://stripe.com
2. Click **"Start now"** or **"Sign up"**
3. Create your account (email + password)
4. Complete the onboarding

### 2.2 Get Your Stripe Keys
1. Go to https://dashboard.stripe.com
2. Make sure you're in **Test Mode** (toggle at top)
3. Click **"Developers"** on the left menu
4. Click **"API Keys"**
5. Copy these two keys:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)
6. Save them somewhere safe

---

## STEP 3: Add Keys to Vercel (5 minutes)

### 3.1 Go to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your **CaffeineLab** project

### 3.2 Go to Settings
1. Click **"Settings"** tab
2. Click **"Environment Variables"** on the left

### 3.3 Add Each Variable
Click **"Add New"** and add these (one at a time):

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe Publishable Key |
| `STRIPE_SECRET_KEY` | Your Stripe Secret Key |

**Important:** After adding each one, click **"Save"**

### 3.4 Redeploy
1. Go back to the **"Deployments"** tab
2. Find the latest deployment
3. Click the **three dots** (...) and select **"Redeploy"**
4. Wait for it to finish (should show a green checkmark)

---

## STEP 4: Test Your Site (2 minutes)

1. Go to your Vercel deployment URL (e.g., `yourproject.vercel.app`)
2. Try to **place an order** with:
   - Payment Method: "Cash on Delivery"
   - Your test address and phone
3. Go back to Supabase → **"SQL Editor"**
4. Run this to see your order:
```sql
SELECT * FROM orders;
```

**If you see your order in the database, YOU'RE READY! 🎉**

---

## STEP 5: Test Stripe Card Payments (Optional but Recommended)

When you try to pay with a card, use these test card numbers (Stripe test mode only):

- **Successful payment**: `4242 4242 4242 4242`
- **Failed payment**: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

---

## What Your Site Can Do Now:

✅ Customers browse products in English or Georgian  
✅ Add items to cart  
✅ Place orders with delivery address  
✅ Choose payment method:
  - Cash on Delivery
  - Card (Stripe)
  - Phone Transfer
✅ Orders are saved in your database  
✅ You can see all orders in Supabase  

---

## Next Steps (Optional):

- [ ] Set up email notifications for new orders
- [ ] Create an admin dashboard to manage orders
- [ ] Add order status tracking
- [ ] Switch from Stripe Test Mode to Live Mode when ready to accept real payments

---

## Stuck? Common Issues:

**Q: I added the keys but it's still not working**
- Make sure you clicked **"Save"** on each variable
- Make sure you hit **"Redeploy"** after adding all variables
- Wait 2-3 minutes for the redeploy to finish

**Q: Where do I see my orders?**
- Go to Supabase dashboard → Click your project → Click **"SQL Editor"**
- Run: `SELECT * FROM orders;`

**Q: Can I test with real cards?**
- Not yet! Switch from Test Mode in Stripe when you're ready to go live

---

**Your site is now production-ready! 🚀☕**
