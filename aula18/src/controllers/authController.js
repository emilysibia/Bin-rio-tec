const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const authController = {
  // QUESTÃO 1 - Cadastrar usuário com hash de senha, salvo no banco
  registrar: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
      }

      if (senha.length < 6) {
        return res.status(400).json({ mensagem: "A senha deve ter no mínimo 6 caracteres." });
      }

      const usuarioExiste = await Usuario.findOne({ email });
      if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Usuário já cadastrado." });
      }

      // Criptografar a senha com salt (fator de custo 10)
      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({ email, senha: senhaHash });

      res.status(201).json({ mensagem: "Usuário registrado com sucesso!", usuarioId: novoUsuario._id });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao registrar usuário." });
    }
  },

  // QUESTÃO 2 - Login e emissão de JWT (expira em 30 minutos)
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
      );

      res.status(200).json({ status: "AUTENTICADO", token });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao realizar login." });
    }
  },

  // Rota protegida de teste (usada pela Questão 3)
  perfil: (req, res) => {
    res.status(200).json({
      mensagem: "Acesso autorizado à rota protegida!",
      dadosUsuarioLogado: req.usuario
    });
  }
};

module.exports = authController;
