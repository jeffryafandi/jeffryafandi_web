const mongoose = require('mongoose');

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect('mongodb+srv://admin:tahuasin@cluster0.a6ww9.mongodb.net/jeffryafandi?retryWrites=true&w=majority', dbOptions);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      console.log('Mongoose has successfully connected!');
    });

    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection lost');
    });
  }
}