const {authenticateToken} = require('../middleware/authMiddleware');
const {getTask, createTask, deleteTask, updateTask, deleteTaskItems, getAllTask, getFavorites} = require('../controllers/taskController.js');
const app = require('../routes/appRoute.js');

// Endpoint de pegar task favoritas só é autorizado com token
app.get('/v1/task/favorite/:userId', authenticateToken, getFavorites);

// Endpoint de pegar taskS só é autorizado com token
app.get('/v1/task/all/:userId', authenticateToken, getAllTask);

// Endpoint de pegar task só é autorizado com token
app.get('/v1/task/:id', authenticateToken, getTask);

// Endpoint de criar task só é autorizado com token
app.post('/v1/task', authenticateToken, createTask);

// Endpoint de atualizar a task só é autorizado com token
app.put('/v1/task/:taskId', authenticateToken, updateTask);

// Rota para excluir um TaskItem
app.delete('/v1/tasks/:taskId/items/:itemId', authenticateToken, deleteTaskItems) 

// Endpoint de criar task só é autorizado com token
app.delete('/v1/task/:taskId', authenticateToken, deleteTask);