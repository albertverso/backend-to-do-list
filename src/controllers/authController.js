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
         return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
         return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gerar o token JWT com id e email do usuário
      const token = jwt.sign(
         { id: user.id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: '1h' } // Token expira em 1 hora (opcional)
      );

      return res.json({ token });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor' });
   }
};

module.exports = {
   login
};
