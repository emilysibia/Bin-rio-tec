function validaVin(req, res, next) {
  const { vin } = req.body;

  if (!vin) {
    return res.status(400).json({ erro: "O campo 'vin' e obrigatorio." });
  }

  if (typeof vin !== 'string' || vin.length !== 12) {
    return res.status(400).json({
      erro: "VIN invalido. O codigo Chassis/VIN deve possuir exatamente 12 caracteres.",
      recebido: vin,
      tamanho: vin.length
    });
  }

  next();
}

module.exports = validaVin;
