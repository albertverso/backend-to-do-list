const app = require('../routes/appRoute.js');
const {login} = require('../controllers/authController.js')
const {logout} = require('../controllers/authController.js')

// Endpoint de login
app.post('/v1/login', login);

// Endpoint de logout
app.post('/v1/logout', logout);