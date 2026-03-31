import { generateInvoice } from '@/app/actions/invoice';
import { InvoiceForm } from '@/components/ui/InvoiceForm';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0D0D10] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            SwissInvoice AI: Mission Control
          </h1>
          <p className="text-gray-400 text-lg">
            Gestisci le tue fature svizzere con precisione chirurgica e intelligenza artificiale.
          </p>
        </header>

        <section className="bg-gradient-to-r from-red-500/10 to-transparent p-1 rounded-2xl">
          <form action={generateInvoice}>
            <InvoiceForm />
          </form>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Stato Abbonamento</h3>
             <p className="text-2xl font-bold text-green-500">PRO (Attivo)</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Fatture Generate</h3>
             <p className="text-2xl font-bold">128</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Prossimo Pagamento</h3>
             <p className="text-2xl font-bold">CHF 49.00</p>
          </div>
        </section>
      </div>
    </main>
  );
}

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <StatCard 
          label="Total Revenue" 
          value="CHF 12'450.80" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<DollarSign color="var(--primary)" />}
        />
        <StatCard 
          label="Pending Payments" 
          value="CHF 3'120.00" 
          trend="4 invoices" 
          icon={<Clock color="#FF9F43" />}
        />
        <StatCard 
          label="Settled QR-Bills" 
          value="342" 
          trend="+18 today" 
          trendUp={true} 
          icon={<FileCheck color="#28C76F" />}
        />
      </div>

      {/* Main Grid: AI Insights + Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Recent Invoices Table */}
        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Recent QR-Bills</h3>
            <button style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px 0' }}>Client</th>
                <th style={{ padding: '12px 0' }}>Amount</th>
                <th style={{ padding: '12px 0' }}>Status</th>
                <th style={{ padding: '12px 0' }}>Date</th>
                <th style={{ padding: '12px 0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <InvoiceRow client="Swiss Global AG" amount="CHF 1,200.00" status="Paid" date="Mar 30, 2026" />
              <InvoiceRow client="Alpina Services" amount="CHF 450.50" status="Pending" date="Mar 28, 2026" />
              <InvoiceRow client="Geneva Tech" amount="CHF 8'000.00" status="Overdue" date="Mar 15, 2026" />
              <InvoiceRow client="Bern Logistics" amount="CHF 320.00" status="Paid" date="Mar 12, 2026" />
              <InvoiceRow client="Zurich Finance" amount="CHF 2'100.00" status="Paid" date="Mar 05, 2026" />
            </tbody>
          </table>
        </div>

        {/* AI Insight Sidebar */}
        <div className="glass" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,0,0,0.02) 100%)', border: '1px solid rgba(255,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sparkles size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>AI Insights</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
            "Based on your recent transaction volume, we recommend increasing your CHF cash reserves by 15% for the upcoming Q3 tax cycle."
          </p>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', opacity: 0.7 }}>Optimized Strategy:</p>
            <p style={{ fontSize: '0.9rem' }}>Convert EUR receivables to CHF tomorrow (predicted 0.4% rate improvement).</p>
          </div>
          <button className="btn-secondary" style={{ width: '100%', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Analyze Deeply</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, trendUp, icon }) {
  return (
    <div className="glass" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: trendUp ? '#28C76F' : trendUp === false ? '#EA5455' : 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '4px 8px', borderRadius: '6px' }}>
          {trend}
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
      <h4 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{value}</h4>
    </div>
  );
}

function InvoiceRow({ client, amount, status, date }) {
  const statusColors = {
    'Paid': '#28C76F',
    'Pending': '#FF9F43',
    'Overdue': '#EA5455'
  };

  return (
    <tr style={{ borderBottom: '1px solid var(--surface-border)', fontSize: '0.95rem', transition: 'var(--transition)' }}>
      <td style={{ padding: '16px 0', fontWeight: '600' }}>{client}</td>
      <td style={{ padding: '16px 0' }}>{amount}</td>
      <td style={{ padding: '16px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${statusColors[status]}20`, color: statusColors[status], padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          <div style={{ width: '6px', height: '6px', background: statusColors[status], borderRadius: '50%' }} />
          {status}
        </div>
      </td>
      <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{date}</td>
      <td style={{ padding: '16px 0' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Download size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
          <ExternalLink size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>
      </td>
    </tr>
  );
}
