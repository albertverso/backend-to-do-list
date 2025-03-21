const bcrypt = require('bcryptjs');
const { User } = require('../models/user')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Verificar se o usuário existe pelo email
      const user = await User.findOne({ where: { email } });

      // Se o usuário não for encontrado ou a senha estiver incorreta
      if (!user) {
         return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
         return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gerar o token JWT com id e email do usuário
      const token = jwt.sign(
         { id: user.id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: '1h' } // Token expira em 1 hora (opcional)
      );

      // Atualizar o token no banco de dados do usuário
      await User.update(
         { currentToken: token }, // Salva o token gerado
         { where: { id: user.id } }
      );

      return res.json({ token });
   } catch (error) {
      return res.status(500).json({ message: 'Erro no servidor' });
   }
};

const logout = async (req, res) => {
   try {
      await User.update(
         { currentToken: null }, // Removemos o token
         { where: { id: req.user.id } }
      );

      return res.json({ message: "Logout realizado com sucesso" });
   } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer logout" });
   }
};

module.exports = {
   login, logout
};
