const app = require('./appRoute')
const {CreateUser, UpdateUser, DeleteUser, getUser} = require('../controllers/userController')
const upload = require('../middleware/uploadMiddleware'); // Importar o middleware
const {authenticateToken} = require('../middleware/authMiddleware');

// Buscar um usuário por ID
app.get('/v1/user/:id', authenticateToken, getUser);

// Adicionar um novo usuário
app.post('/v1/user', upload.single('profilePic'), CreateUser);

// Atualizar um usuário por ID
app.put('/v1/user/:id', authenticateToken, upload.single('profilePic'), UpdateUser);

// Deletar um usuário por ID
app.delete('/v1/user/:id', authenticateToken, DeleteUser);