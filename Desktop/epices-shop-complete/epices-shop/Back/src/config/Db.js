const path = require('path');

// Db.js lives in src/config, while the env file is in src/.env.
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');

if (!process.env.MONGO) {
  console.error('Missing MONGO in environment. Check src/.env');
} else {
  mongoose.connect(process.env.MONGO)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
}
    
