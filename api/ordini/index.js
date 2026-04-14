const { app } = require('@azure/functions');

// Dati di esempio — in produzione questi verrebbero da un database
const ordersData = [
  { id: 'ORD-2024-0901', data: '14/04/2026', cliente: 'Fiat S.p.A.', prodotto: 'ERP Enterprise Suite', valore: 48200, agente: 'Giulia Romano', stato: 'Confermato' },
  { id: 'ORD-2024-0900', data: '13/04/2026', cliente: 'TechCorp Milano', prodotto: 'Server rack 2U x4', valore: 12800, agente: 'Luca Ferri', stato: 'Spedito' },
  { id: 'ORD-2024-0899', data: '12/04/2026', cliente: 'Banca Mediolanum', prodotto: 'CRM Professional', valore: 95000, agente: 'Sara Conti', stato: 'In attesa' },
  { id: 'ORD-2024-0898', data: '11/04/2026', cliente: 'Ferrari S.p.A.', prodotto: 'Manutenzione Full x5', valore: 7400, agente: 'Marco Bianchi', stato: 'Confermato' },
  { id: 'ORD-2024-0897', data: '10/04/2026', cliente: 'ENI S.p.A.', prodotto: 'NAS 48TB x3', valore: 11200, agente: 'Giulia Romano', stato: 'Spedito' },
  { id: 'ORD-2024-0896', data: '09/04/2026', cliente: 'Leonardo S.p.A.', prodotto: 'Implementazione ERP', valore: 42000, agente: 'Sara Conti', stato: 'Confermato' },
  { id: 'ORD-2024-0895', data: '08/04/2026', cliente: 'Campari Group', prodotto: 'CRM Starter', valore: 4800, agente: 'Luca Ferri', stato: 'Annullato' },
  { id: 'ORD-2024-0894', data: '07/04/2026', cliente: 'Pirelli & C.', prodotto: 'ERP Enterprise Suite', valore: 45000, agente: 'Giulia Romano', stato: 'In attesa' },
];

app.http('ordini', {
  methods: ['GET'],
  authLevel: 'anonymous', // La sicurezza è gestita da staticwebapp.config.json
  handler: async (request, context) => {
    context.log('API ordini chiamata');

    // Parametri di filtro opzionali (es. ?cliente=Fiat&stato=Confermato)
    const cliente = request.query.get('cliente');
    const stato = request.query.get('stato');
    const limit = parseInt(request.query.get('limit') || '10');

    let risultati = [...ordersData];

    if (cliente) {
      risultati = risultati.filter(o =>
        o.cliente.toLowerCase().includes(cliente.toLowerCase())
      );
    }

    if (stato) {
      risultati = risultati.filter(o =>
        o.stato.toLowerCase() === stato.toLowerCase()
      );
    }

    risultati = risultati.slice(0, limit);

    // Calcola totale valore
    const totaleValore = risultati.reduce((sum, o) => sum + o.valore, 0);

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        successo: true,
        totale_risultati: risultati.length,
        totale_valore_eur: totaleValore,
        ordini: risultati
      })
    };
  }
});
