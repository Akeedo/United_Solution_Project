const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/united-solution-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
