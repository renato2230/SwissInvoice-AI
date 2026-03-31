import { Check, ArrowRight, Zap, Shield, FileText, BarChart3, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="landing-page fade-in">
      {/* Navigation */}
      <nav className="glass" style={{ margin: '20px auto', maxWidth: '1000px', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>SWISS<span style={{ color: 'var(--primary)' }}>BILL</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontWeight: '500', color: 'var(--text-muted)' }}>
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Log In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '100px 24px 140px' }}>
        <div className="badge badge-new" style={{ marginBottom: '24px' }}>Now live in Switzerland</div>
        <h1 className="h1">
          Automate your Business with <br />
          <span style={{ color: 'var(--primary)' }}>Swiss Precision.</span>
        </h1>
        <p className="p-large" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Generate QR-bills, manage subscriptions in CHF, and leverage AI to streamline your financial operations. Built for the modern Helvetic enterprise.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/dashboard" className="btn-primary">
            Get Started Free <ArrowRight size={20} />
          </Link>
          <button className="btn-secondary">View Demo</button>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" style={{ padding: '100px 0', background: 'linear-gradient(to bottom, #0D0D10, #1A1A1D)' }}>
        <div className="container">
          <h2 className="h2" style={{ textAlign: 'center', marginBottom: '60px' }}>Engineered for Switzerland</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <FeatureCard 
              icon={<FileText color="var(--primary)" />} 
              title="QR-Bill Automation" 
              desc="Fully compliant Swiss QR-bills generated in seconds. Ready for your customers and banks."
            />
            <FeatureCard 
              icon={<Zap color="var(--primary)" />} 
              title="AI Financial Insights" 
              desc="Harness GPT-4 to analyze cash flow, predict expenses, and automate categorization."
            />
            <FeatureCard 
              icon={<Shield color="var(--primary)" />} 
              title="Secure Payments" 
              desc="Native Stripe integration with CHF support. Pay and get paid with zero friction."
            />
            <FeatureCard 
              icon={<BarChart3 color="var(--primary)" />} 
              title="Real-time Analytics" 
              desc="Monitor your business health with beautiful, interactive dashboards and reports."
            />
            <FeatureCard 
              icon={<Mail color="var(--primary)" />} 
              title="Smart Invoicing" 
              desc="Automatic e-mail delivery via Resend. Professional templates that convert."
            />
            <FeatureCard 
              icon={<MessageSquare color="var(--primary)" />} 
              title="Local Support" 
              desc="Built by experts who understand the Swiss market and regulatory requirements."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="h2">Simple, Transparent Pricing</h2>
            <p className="p-large">Choose the plan that fits your growth.</p>
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <PricingCard 
              title="Starter" 
              price="0" 
              features={['5 QR-bills / mo', 'Basic Analytics', 'Community Support']} 
            />
            <PricingCard 
              title="Professional" 
              price="49" 
              highlight={true}
              features={['Unlimited QR-bills', 'AI Assistance', 'Stripe Integration', 'Priority Support']} 
            />
            <PricingCard 
              title="Enterprise" 
              price="199" 
              features={['Multiple Organizations', 'API Access', 'Dedicated Account Manager', 'Custom Workflows']} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 0', borderTop: '1px solid var(--surface-border)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)' }}>© 2026 SwissBill Elite. All rights reserved. Made for the Alpine efficiency.</p>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          background: radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.05) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass" style={{ padding: '32px', transition: 'var(--transition)' }}>
      <div style={{ marginBottom: '20px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlight = false }) {
  return (
    <div className={`glass ${highlight ? 'highlight' : ''}`} style={{ 
      padding: '48px', 
      minWidth: '320px', 
      border: highlight ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
      position: 'relative',
      transform: highlight ? 'scale(1.05)' : 'none',
      zIndex: highlight ? 2 : 1
    }}>
      {highlight && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>CHF {price}</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>/mo</span>
      </div>
      <ul style={{ listStyle: 'none', marginBottom: '40px' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#EEE' }}>
            <Check size={18} color="var(--primary)" /> {f}
          </li>
        ))}
      </ul>
      <button className={highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>
        Get Started
      </button>
    </div>
  );
}
