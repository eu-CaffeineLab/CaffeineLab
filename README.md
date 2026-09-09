# CaffeineLab ☕

A modern coffee shop delivery website with multi-language support (English & Georgian) and flexible payment options.

## Features

✅ **Language Support**: English & Georgian language selector
✅ **Product Catalog**: Beautiful coffee products display
✅ **Shopping Cart**: Add/remove items with quantity control
✅ **Three Payment Options**:
  - Cash on Delivery
  - Pay Online with Card (Stripe)
  - Pay on Delivery via Phone Transfer
✅ **Delivery Address**: Customers can enter their delivery location
✅ **Order Confirmation**: Confirmation page after order placement
✅ **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **State Management**: React Context API
- **Payment Processing**: Stripe (ready to integrate)
- **Styling**: Tailwind CSS with custom coffee theme

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eu-CaffeineLab/CaffeineLab.git
cd CaffeineLab
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (copy from `.env.local.example`):
```bash
cp .env.local.example .env.local
```

4. Add your Stripe keys to `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
CaffeineLab/
├── pages/
│   ├── index.js           # Language selector
│   ├── shop.js            # Product catalog
│   ├── cart.js            # Shopping cart & checkout
│   └── _app.js            # App wrapper with providers
├── context/
│   ├── LanguageContext.js # Language management
│   └── CartContext.js     # Cart state management
├── data/
│   └── products.js        # Coffee products data
├── styles/
│   └── globals.css        # Global styles with Tailwind
├── public/                # Static assets
└── package.json           # Dependencies
```

## Payment Integration

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com)
3. Add them to `.env.local`

### Payment Flow

- **Cash**: Order confirmed, payment at delivery
- **Card Online**: Redirect to Stripe Checkout (to be implemented)
- **Card on Delivery**: Order confirmed, payment via phone transfer

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

### Environment Variables for Production

Add to your Vercel dashboard:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Next Steps

- [ ] Integrate Stripe for online card payments
- [ ] Add backend API for order storage (database)
- [ ] Setup email notifications for orders
- [ ] Add order tracking system
- [ ] Create admin dashboard
- [ ] Add more coffee products
- [ ] Setup delivery management system

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, create an issue on GitHub.

---

**Happy selling! ☕**
