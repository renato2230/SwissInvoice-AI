import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16',
});

export default stripe;

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'CHF',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 49,
    currency: 'CHF',
    priceId: 'price_mock_pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    currency: 'CHF',
    priceId: 'price_mock_enterprise',
  },
];
