const { connect, connection } = require('mongoose');
const connectionsString = 'mongodb://localhost:27017';

connect(connectionsString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;