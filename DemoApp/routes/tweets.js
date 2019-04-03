const express = require('express');
const router = express.Router(); //create a router object
const Tweet = require('../models/tweetModel'); //get the tweet Model

//@route GET
//@desc GETS ALL THE TWEETS
router.get('/',(req,res)=>{
    Tweet.find(function (err,data) {
        if(!err){
            console.log("GOT DATA SUCESSFULLY");
            res.json(data);
        }else{
            console.log("Error");
            res.json({});
        }
    });
});

//@route POST
//@desc ADDS A TWEET
router.post('/',(req,res)=>{
    const newTweet = new Tweet({
        tweetID : req.body.tweetID,
        tweetUser : req.body.tweetUser,
        tweetDate : req.body.tweetDate,
        tweetBody : req.body.tweetBody
    });
    newTweet.save(function (err,data) {
        if(!err)
        {
            console.log("Item added sucessfully");
            res.json(data);
        }else{
            console.log("Error Adding a new object");
            res.json({});
        }
    });
});

//@route PUT
//@desc MODIFIES A TWEET

//@route DELETE
//@desc DELETE A  TWEET WITH A PARTICULAR ID
router.delete('/:id',(req,res)=>{
  Tweet.findById(req.params.id,function (err,data) {
     if(!err && data)
     {
         data.remove(function (err,data) {
             if(!err)
             {
                 console.log("Deleted object");
                 res.json(data);
             }else{
                 console.log("Could not delete the object");
                 res.json({});
             }
         });
     }else{
         console.log("Couldn't find the object with the given id");
         res.json({});
     }
  });
});

module.exports = router;