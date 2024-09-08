const app = require('./appRoute')
const {CreateUser, UpdateUser, DeleteUser} = require('../controllers/userController')
const upload = require('../middleware/uploadMiddleware'); // Importar o middleware

// Adicionar um novo usuário
app.post('/v1/user', upload.single('profilePic'), CreateUser);

// Atualizar um usuário por ID
app.put('/v1/user/:id', UpdateUser);

// Deletar um usuário por ID
app.delete('/v1/user/:id', DeleteUser);