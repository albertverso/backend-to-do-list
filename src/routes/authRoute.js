const app = require('../routes/appRoute.js');
const {authenticateToken} = require('../middleware/authMiddleware')
const {login, getTask, createTask, deleteTask, updateTask, deleteTaskItems} = require('../controllers/authController.js')

// Endpoint de login
app.post('/v1/login', login);

// Endpoint de pegar task só é autorizado com token
app.get('/v1/task', authenticateToken, getTask);

// Endpoint de criar task só é autorizado com token
app.post('/v1/task', authenticateToken, createTask);

// Endpoint de atualizar a task só é autorizado com token
app.put('/v1/task/:taskId', authenticateToken, updateTask);

// Rota para excluir um TaskItem
app.delete('/v1/tasks/:taskId/items/:itemId', authenticateToken, deleteTaskItems) 

// Endpoint de criar task só é autorizado com token
app.delete('/v1/task/:taskId', authenticateToken, deleteTask);

