const colors = require('colors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// ROUTES
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const connectionToDB = require('./config/connectDb');
connectionToDB();

const app = express();

__dirname = path.resolve();
// console.log(__dirname);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Gallery API' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `${colors.green.bold('✔')} 👍 Server running in ${colors.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${colors.blue.bold(PORT)}`
  );
});
