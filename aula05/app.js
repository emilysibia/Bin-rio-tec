const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();
const PORT = 3000;

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Rota Pública
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: "ONLINE", aplicacao: "Binário Tech API v2" });
});

// Rotas Protegidas por Autenticacao
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

// Middleware Global de Tratamento de Erros 404 (Rota nao encontrada)
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        caminho: req.originalUrl,
        metodo: req.method
    });
});

app.listen(PORT, () => {
    console.log(`[Binário Tech] Servidor de Middlewares ativo na porta ${PORT}`);
});
