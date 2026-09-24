const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/ValidarJWT');

// QUESTÃO 1
router.post('/register', authController.registrar);

// QUESTÃO 2
router.post('/login', authController.login);

// QUESTÃO 3 - rota protegida pelo middleware
router.get('/relatorio', validarJWT, authController.perfil);

module.exports = router;
