const { app } = require('@azure/functions');

const clientiData = [
  { id: 'CLI-001', nome: 'Fiat S.p.A.', partita_iva: 'IT01234567890', settore: 'Automotive', citta: 'Torino', fatturato_ytd: 280000, num_ordini: 12, agente: 'Giulia Romano', classe: 'A' },
  { id: 'CLI-002', nome: 'ENI S.p.A.', partita_iva: 'IT00905811006', settore: 'Energia', citta: 'Roma', fatturato_ytd: 195000, num_ordini: 8, agente: 'Luca Ferri', classe: 'A' },
  { id: 'CLI-003', nome: 'Banca Mediolanum', partita_iva: 'IT02124040169', settore: 'Finance', citta: 'Milano', fatturato_ytd: 142000, num_ordini: 5, agente: 'Sara Conti', classe: 'B' },
  { id: 'CLI-004', nome: 'Leonardo S.p.A.', partita_iva: 'IT00401167065', settore: 'Difesa/Aerospazio', citta: 'Roma', fatturato_ytd: 98000, num_ordini: 3, agente: 'Giulia Romano', classe: 'B' },
  { id: 'CLI-005', nome: 'Ferrari S.p.A.', partita_iva: 'IT00159560366', settore: 'Automotive', citta: 'Maranello', fatturato_ytd: 75000, num_ordini: 7, agente: 'Marco Bianchi', classe: 'B' },
  { id: 'CLI-006', nome: 'Campari Group', partita_iva: 'IT06672120158', settore: 'FMCG', citta: 'Milano', fatturato_ytd: 48000, num_ordini: 4, agente: 'Luca Ferri', classe: 'C' },
];

app.http('clienti', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('API clienti chiamata');

    const nome = request.query.get('nome');
    const classe = request.query.get('classe');
    const settore = request.query.get('settore');

    let risultati = [...clientiData];

    if (nome) risultati = risultati.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
    if (classe) risultati = risultati.filter(c => c.classe === classe.toUpperCase());
    if (settore) risultati = risultati.filter(c => c.settore.toLowerCase().includes(settore.toLowerCase()));

    const totale_fatturato = risultati.reduce((sum, c) => sum + c.fatturato_ytd, 0);

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        successo: true,
        totale_clienti: risultati.length,
        totale_fatturato_ytd_eur: totale_fatturato,
        clienti: risultati
      })
    };
  }
});
