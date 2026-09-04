const express = require('express');
const cors = require('cors');
const scaniaRouter = require('../src/routes/scaniaRoutes');
const mercedesRouter = require('../src/routes/mercedesRoutes');
const app = express();
const PORT = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
});

//Agrupamento de rotas por montadora
app.use('/api/v1/telemetria/scania', scaniaRouter);
app.use('/api/v1/telemetria/mercedes', mercedesRouter);

//Rota 404
app.use((req, res) => {
    res.status(404).json({ erro: "Modulo de rota de telemetria nao encontrada."});
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor modularizado ativo na porta ${PORT}` );
});
