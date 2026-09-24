require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database');
const provaRoutes = require('./src/routes/provaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Conecta ao MongoDB
conectarBanco();

// Todas as rotas da avaliação ficam sob /api/v1/prova
app.use('/api/v1/prova', provaRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Avaliação Prática - Binário Tech - Aula 18' });
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
});
