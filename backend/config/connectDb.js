const colors = require('colors');
const mongoose = require('mongoose');

const connectionToDB = async () => {
  try {
    const connectionParams = {
      dbName: process.env.DB_NAME,
    };
    let MONGO_URI = '';
    if (process.env.NODE_ENV === 'Production') {
      MONGO_URI = process.env.MONGO_URI;
    } else {
      MONGO_URI = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@192.168.0.111:${process.env.MONGO_PORT}`;
    }

    // console.log(MONGO_URI);

    const connect = await mongoose.connect(MONGO_URI, connectionParams);
    console.log(
      `${colors.blue.bold(`MongoDB Connected: ${connect.connection.host}`)}`
    );
  } catch (error) {
    console.error(`${colors.red.bold(`Error: ${error.message}`)}`);
    process.exit(1);
  }
};

module.exports = connectionToDB;
