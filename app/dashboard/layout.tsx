'use client';
import { Home, FileText, CreditCard, PieChart, Settings, LogOut, Bell, Search, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Overview', href: '/dashboard' },
    { icon: <FileText size={20} />, label: 'QR-Bills', href: '/dashboard/bills' },
    { icon: <PieChart size={20} />, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: <CreditCard size={20} />, label: 'Payments', href: '/dashboard/payments' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid var(--surface-border)', padding: '32px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px', paddingLeft: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>SWISS<span style={{ color: 'var(--primary)' }}>BILL</span></span>
        </div>

        <nav style={{ flex: 1 }}>
          <div style={{ paddingLeft: '16px', marginBottom: '16px', fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</div>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: 'var(--radius)',
                color: pathname === item.href ? 'white' : 'var(--text-muted)',
                background: pathname === item.href ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'var(--transition)',
                marginBottom: '4px'
              }}>
                {item.icon}
                <span style={{ fontWeight: pathname === item.href ? '600' : '500' }}>{item.label}</span>
                {pathname === item.href && <div style={{ marginLeft: 'auto', width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }} />}
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            width: '100%',
            color: '#FF4757', 
            fontWeight: '600'
          }}>
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ 
          height: '80px', 
          borderBottom: '1px solid var(--surface-border)', 
          padding: '0 40px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(13, 13, 16, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{ width: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <Search size={18} color="rgba(255,255,255,0.3)" />
            <input 
              placeholder="Search invoices, clients..." 
              style={{ background: 'none', padding: '12px', width: '100%', color: 'white' }} 
            />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>⌘K</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              <PlusCircle size={18} /> New QR-Bill
            </button>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color="var(--text-muted)" />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', border: '2px solid var(--background)' }} />
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF0000, #CC0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
