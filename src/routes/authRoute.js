const app = require('../routes/appRoute.js');
const {login} = require('../controllers/authController.js')

// Endpoint de login
app.post('/v1/login', login);