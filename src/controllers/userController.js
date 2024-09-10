const {User} = require('../models/user')
const bcrypt = require('bcryptjs');

// Adicionar um novo usuário
const CreateUser = async (req, res) => {
    try {
        const { firstName,
            lastName, email, password } = req.body;
        const profilePic = req.file ? req.file.path : null; // Pega a URL da imagem do Cloudinary

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePic: profilePic, // Salva a URL da imagem no banco de dados
        });

        res.status(201).send(user)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  };

const getUser = async (req, res) => {
try{
    User.findOne({ where: { id: req.params.id } }).then((result) => res.send(result))
} catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
}
};

// Atualizar um usuário por ID
// Atualizar um usuário existente
const UpdateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profilePic = req.file ? req.file.path : null; // Pega a nova URL da imagem, se houver

        // Buscar o usuário pelo ID
        const user = await User.findOne({ where: { id: req.params.id } });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualiza os campos se fornecidos
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;

        // Verifica se a senha foi enviada e, se sim, codifica a nova senha
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        
        // Atualiza a foto de perfil, se fornecida
        if (profilePic) {
            user.profilePic = profilePic;
        }

        // Salva as alterações no banco de dados
        await user.save();

        // Retorna o usuário atualizado
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
};


// Deletar um usuário por ID
const DeleteUser = async (req, res) => {
    try {
        User.destroy({ where: { id: req.params.id } }).then((result) => {
            res.send('deletei com sucesso essa quantidade de linhas: '+result)
        })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

module.exports = {
    CreateUser, UpdateUser, DeleteUser, getUser
  };