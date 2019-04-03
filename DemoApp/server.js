const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config.js');
const tweetRoute = require('./routes/tweets.js')
const app = express();

//bodyparser middleware
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

app.listen(3000,function(){
    console.log("Server is Listening");
});
