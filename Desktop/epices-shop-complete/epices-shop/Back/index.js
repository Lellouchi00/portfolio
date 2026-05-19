// Connect to database
require('./src/config/Db');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
 
app.use(express.json());
//Routes
const authRoutes = require('./src/routes/auth');   
//Api
app.use('/api/auth', authRoutes);   

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
