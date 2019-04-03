const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema
var tweetSchema = new Schema({
    tweetID : Number,
    tweetUser : String,
    tweetDate : String,
    tweetBody : String,
});

//compile the schema into a model
var Tweet = mongoose.model('Tweet',tweetSchema);

//export the Model
module.exports = Tweet;