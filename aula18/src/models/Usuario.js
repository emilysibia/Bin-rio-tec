const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'O email é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      // Aqui é sempre armazenado o HASH da senha, nunca a senha em texto puro
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Usuario', UsuarioSchema);
