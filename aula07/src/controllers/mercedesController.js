let frotaMercedes = [
  { id: 1, modelo: 'Actros', vin: 'MBACTROS001', km: 152340, status: 'ativo' },
  { id: 2, modelo: 'Atego', vin: 'MBATEGO0001', km: 98210, status: 'ativo' },
];

function listarTelemetria(req, res) {
  return res.status(200).json(frotaMercedes);
}

function registrarTelemetria(req, res) {
  const { modelo, vin, km, status } = req.body;

  if (!modelo || !vin) {
    return res.status(400).json({ erro: 'Campos "modelo" e "vin" são obrigatórios.' });
  }

  const novoCaminhao = {
    id: frotaMercedes.length + 1,
    modelo,
    vin,
    km: km || 0,
    status: status || 'ativo',
  };

  frotaMercedes.push(novoCaminhao);
  return res.status(201).json(novoCaminhao);
}

module.exports = { listarTelemetria, registrarTelemetria };
