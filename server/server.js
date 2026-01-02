const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();


app.use(express.json());

app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
