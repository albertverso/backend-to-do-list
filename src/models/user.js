const { DataTypes, Sequelize } = require('sequelize');
const { uri } = require('../config/database.js');

const sequelize = new Sequelize(uri);
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
   firstName: { type: DataTypes.STRING, allowNull: false },
   lastName: { type: DataTypes.STRING, allowNull: false },
   email: { type: DataTypes.STRING, allowNull: false, unique: true },
   password: { type: DataTypes.STRING, allowNull: false },
   profilePic: { type: DataTypes.STRING, allowNull: true },  // Foto em base64
}, {
   hooks: {
      beforeCreate: async (user) => {
         const salt = await bcrypt.genSalt(10);  // Gerando o salt para a senha
         user.password = await bcrypt.hash(user.password, salt);  // Criptografando a senha
      },
   }
   ,
    timestamps: true, // Defina como `true` se você usar timestamps
});

// Sincronizar o modelo com o banco de dados    
sequelize.sync(); // Usa alter para ajustar a tabela existente

module.exports = {User};
