const jwt = require('jsonwebtoken');

function validarJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Token omitido -> 401
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const partes = authHeader.split(' ');
  const token = partes.length === 2 ? partes[1] : partes[0];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
    // Token inválido ou expirado -> 403
    if (erro) {
      return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }

    req.usuario = { id: decoded.id, email: decoded.email };
    next();
  });
}

module.exports = validarJWT;
