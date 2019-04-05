const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const tweetRoute = require('./routes/tweets.js')
const app = express();
const cors = require('cors');

//bodyparser middleware
app.use(cors())
app.use(express.json());

// DB Config
const db = config.mongoURI;
mongoose.connect(db,{useNewUrlParser :true},function(err){
    if(!err)
        console.log("Mongo is connected");
    else
        console.log("Error connecting to Mongo");
});

//Use Routes now
app.use('/api/tweets',tweetRoute);

app.listen(config.port,function(){
    console.log("Server is Listening");
});
