
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const loginSchema = schema({
  username: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const logins = mongoose.model('logins', loginSchema);
module.exports = logins;

