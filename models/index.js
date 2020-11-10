require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err => {
    console.log('err', err)
});

module.exports = mongoose;