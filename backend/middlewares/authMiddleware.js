const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de proteção (apenas usuários autenticados)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Decodifica o token e verifica
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário no banco (sem retornar a senha)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(403).json({ message: 'Usuário não encontrado' });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    return res.status(403).json({ message: 'Token não encontrado' });
  }
};

// Middleware para verificar se o usuário é administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores' });
  }
};

module.exports = { protect, admin };
