const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/techTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err => {
    console.log('err', err)
});

module.exports = mongoose;