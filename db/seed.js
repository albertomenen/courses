require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Client = require('../models/Client');

const clients = [
  {
    "name": "Web development 4 everyone",
    "surname": "https://www.aptech.net.in/images/course/full/web-development-training.jpg",
    "phone": 909989808,
    "email": "loloo@lololo.com",
    "photo": "Stringorloquesea",
    "bill": 10000
  },
  {
    "name": "Web development 4 everyone",
    "surname": "https://www.aptech.net.in/images/course/full/web-development-training.jpg",
    "phone": 909989808,
    "email": "loloo@lololo.com",
    "photo": "Stringorloquesea",
    "bill": 10000
  },
  {
    "name": "Web development 4 everyone",
    "surname": "https://www.aptech.net.in/images/course/full/web-development-training.jpg",
    "phone": 909989808,
    "email": "loloo@lololo.com",
    "photo": "Stringorloquesea",
    "bill": 10000
  },
  {
    "name": "Web development 4 everyone",
    "surname": "https://www.aptech.net.in/images/course/full/web-development-training.jpg",
    "phone": 909989808,
    "email": "loloo@lololo.com",
    "photo": "Stringorloquesea",
    "bill": 10000
  }
]

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(() => {
    return Course.deleteMany({})
  })
  .then(() => {
    return Client.create(clients)
  })
  .then((created) => {
    console.log(`Created ${created.length} clients`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close()
  })