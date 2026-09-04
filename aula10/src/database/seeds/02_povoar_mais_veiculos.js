exports.seed = async function(knex) {
  // NÃO apaga os dados existentes - apenas adiciona novos veículos
  await knex('veiculos').insert([
    { placa: 'MER-3030', montadora: 'Mercedes-Benz', modelo: 'Actros 2651' },
    { placa: 'DAF-4040', montadora: 'DAF', modelo: 'XF 480' }
  ]);
};
