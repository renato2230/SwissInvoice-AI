'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Success! Check your email for the magic link.');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'radial-gradient(circle at center, #1A1A1D 0%, #0D0D10 100%)',
      padding: '24px'
    }}>
      <div className="glass fade-in" style={{ 
        maxWidth: '440px', 
        width: '100%', 
        padding: '48px', 
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>+</div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>SWISS<span style={{ color: 'var(--primary)' }}>BILL</span></span>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Passwordless login via Magic Link. <br />Safe and simplified Swiss efficiency.</p>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Work Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
              <input 
                type="email" 
                placeholder="CEO@enterprise.ch" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--surface-border)', 
                  padding: '14px 16px 14px 48px', 
                  borderRadius: '12px', 
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'var(--transition)'
                }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', marginBottom: '24px' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Send Magic Link <ArrowRight size={20} /></>}
          </button>
        </form>

        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            background: message.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: message.includes('Error') ? '#EF4444' : '#10B981',
            fontSize: '0.9rem',
            border: `1px solid ${message.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            marginBottom: '24px'
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
          <ShieldCheck size={16} /> 
          Enterprise-grade security by Supabase Auth.
        </div>
      </div>

      <style jsx>{`
        input:focus {
          border-color: var(--primary) !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.1);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
