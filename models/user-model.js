'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// end destination -> 30-35 miles (can make this a dropdown in the future)
// if current location, user model needs address or user enters in their own address
// 

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  phone: {
    type: String,
    required: true
  },
  profilePicUrl: {
    type: String,
  },
  bio: {
    type: String
  }
});

UserSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    phone: this.phone,
    city: this.city,
    state: this.state,
    profilePicUrl: this.profilePicUrl
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
