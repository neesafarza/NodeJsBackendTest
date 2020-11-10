const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: false },
  typeOfUser: { type: String, required: true },
  profession: {type: String, required: false},
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  }
});

UsersSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('User', UsersSchema);
