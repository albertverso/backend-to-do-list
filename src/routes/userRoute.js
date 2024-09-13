const app = require('./appRoute')
const {CreateUser, UpdateUser, DeleteUser, getUser} = require('../controllers/userController')
const upload = require('../middleware/uploadMiddleware'); // Importar o middleware
const {authenticateToken} = require('../middleware/authMiddleware');

// Buscar um usuário por ID
app.get('/v1/user/:id', authenticateToken, getUser);

// Função para verificar se é uma URL válida
function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

// Rota de criação de usuário
app.post('/v1/user', (req, res, next) => {
    // Verifica se profilePic é uma URL e ignora o multer se for uma URL válida
    if (req.body.profilePic && isValidUrl(req.body.profilePic)) {
      // Ignora o multer e chama CreateUser diretamente
      return CreateUser(req, res);
    }
  
    // Se profilePic for um arquivo, chama o multer para processar o upload
    upload.single('profilePic')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
      }
      // Chama a função CreateUser após o upload do arquivo
      return CreateUser(req, res);
    });
  });

// Atualizar um usuário por ID
app.put('/v1/user/:id', authenticateToken, upload.single('profilePic'), UpdateUser);

// Deletar um usuário por ID
app.delete('/v1/user/:id', authenticateToken, DeleteUser);