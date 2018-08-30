'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const User = require('../models/user-model');
const Carpool = require('../models/carpool');

const seedUsers = require('../db/seed/users');
const seedCarpools = require('../db/seed/carpools');

console.log(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    console.log(seedUsers);
    return Promise.all([       
       User.insertMany(seedUsers),
       User.createIndexes(),
       Carpool.insertMany(seedCarpools),      
       Carpool.createIndexes()
    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
