const mongoose = require('mongoose')

// Connect with mongodb atlas
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(error => console.log('error', error));
