const colors = require('colors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

// ROUTES
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');

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
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Gallery API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/photo', photoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `${colors.green.bold('✔')} 👍 Server running in ${colors.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${colors.blue.bold(PORT)}`
  );
});
