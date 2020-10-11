var mongoose = require( 'mongoose' ); 
var gracefulShutdown;
var dbURI = 'mongodb://root:8d59zfHHgoHN@54.89.191.207/blog';
mongoose.connect(dbURI);
// Monitor and report when database is connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
// Monitor and report error connecting to database
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
// Monitor and report when database is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
// Closes (disconnects) from Mongoose DB upon shutdown
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through ' + msg);
      callback();
    });
  };
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
      process.kill(process.pid, 'SIGUSR2');
  }); });
  
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
      process.exit(0);
  }); });
require('./blogs');