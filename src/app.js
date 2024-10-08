require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('./routes/appRoute')

require('./routes/authRoute')
require('./routes/userRoute')
require('./routes/taskRoute')

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });