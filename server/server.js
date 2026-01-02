const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://contact-manager-bbx78zyx5-swatis-projects-14af05e9.vercel.app/contacts'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

// Body parser
app.use(express.json({ extended: false }));

// Routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
