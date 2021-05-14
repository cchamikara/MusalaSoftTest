const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const Device = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [
      {
        type: String,
        enum: ['offline', 'online'],
      },
    ],
    default: ['offline'],
  },
});

const Gateway = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ip: {
    type: String,
    validate(value) {
      if (!validator.isIP(value, 4)) {
        throw new Error('Invalid IP address');
      }
    },
  },
  devices: [Device],
});

module.exports = mongoose.model('Gateway', Gateway);
