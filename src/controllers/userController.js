const {User} = require('../models/user')

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
const UpdateUser = async (req, res) => {
    try {
        User.update(req.body, { where: { id: req.params.id } }).then((result) => res.send(result))
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
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