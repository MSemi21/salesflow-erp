const { app } = require('@azure/functions');

app.http('dashboard', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('API dashboard chiamata');

    // Riepilogo dati per Copilot Studio
    const riepilogo = {
      fatturato_ytd_eur: 2840000,
      fatturato_ytd_label: '€2,84M',
      variazione_percentuale_yoy: 12.4,
      ordini_questo_mese: 148,
      valore_medio_ordine_eur: 4210,
      pipeline_attiva_eur: 890000,
      opportunita_aperte: 23,
      offerte_in_scadenza_7gg: 6,
      tasso_conversione_offerte: 38,
      top_cliente: 'Fiat S.p.A.',
      top_agente: 'Giulia Romano',
      obiettivo_annuale_eur: 3200000,
      obiettivo_raggiunto_percentuale: 88,
      categorie_vendita: [
        { categoria: 'Software', valore_eur: 1140000, percentuale: 40 },
        { categoria: 'Hardware', valore_eur: 810000, percentuale: 29 },
        { categoria: 'Servizi', valore_eur: 630000, percentuale: 22 },
        { categoria: 'Manutenzione', valore_eur: 260000, percentuale: 9 }
      ],
      ordini_in_attesa: 7,
      alert: [
        '3 offerte in scadenza entro 48 ore',
        'Ordine ORD-2024-0892 in attesa di approvazione credito'
      ]
    };

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ successo: true, dati: riepilogo })
    };
  }
});
