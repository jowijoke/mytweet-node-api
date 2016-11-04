/**
 * Created by User on 04/11/2016.
 */

'use strict';

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  email: String,
  password: String,
});

const Administrator = mongoose.model('Administrator', adminSchema);

module.exports = Administrator;
