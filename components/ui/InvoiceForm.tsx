'use client';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PlusCircle } from 'lucide-react';

/**
 * Premium Invoice Creation Form.
 * Integrates with Next.js Server Actions and AI for data correction.
 */
export function InvoiceForm() {
  const { pending } = useFormStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-none" />
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">+</div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Crea Nuova Fattura (Swiss Standard)
              </CardTitle>
              <CardDescription className="text-gray-400">
                La nostra IA correggerà automaticamente i dati per il formato svizzero QR-bill.
              </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            name="recipientName" 
            placeholder="Nome del destinatario" 
            required 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Input 
            name="recipientAddress" 
            placeholder="Indirizzo (Via e numero)" 
            required 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Input 
            name="recipientZipCity" 
            placeholder="CAP Città (es: 8001 Zürich)" 
            required 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Input 
            name="amount" 
            type="number" 
            step="0.01" 
            placeholder="Valore (CHF)" 
            required 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary"
          />
        </div>
        <Input 
            name="vatRate" 
            type="number" 
            step="0.1" 
            placeholder="Tassa IVA (%) - p.es. 8.1" 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary"
          />
        <Textarea 
            name="description" 
            placeholder="Descrizione del servizio o prodotto..." 
            required 
            disabled={pending} 
            className="bg-white/5 border-white/10 focus:border-primary h-32"
          />
        <Input 
          name="dueDays" 
          type="number" 
          placeholder="Giorni per il pagamento (default: 30)" 
          disabled={pending} 
          className="bg-white/5 border-white/10 focus:border-primary"
        />
      </CardContent>
      <CardFooter className="relative z-10 pt-4">
        <Button 
          type="submit" 
          disabled={pending} 
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-6 text-lg transition-all"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando con IA...
            </>
          ) : (
            <div className="flex items-center gap-2">
              <PlusCircle size={20} />
              Genera Fattura Swiss-QR
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
