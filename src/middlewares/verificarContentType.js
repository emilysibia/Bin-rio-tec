const verificarContentType = (req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        status: "REQUISICAO_INVALIDA",
        mensagem: "Content-Type inválido. Esperado 'application/json'."
      });
    }
  }
  next();
};

module.exports = verificarContentType;
