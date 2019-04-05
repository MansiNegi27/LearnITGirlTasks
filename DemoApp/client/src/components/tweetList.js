import React, { Component } from 'react';
import TweetItem from './tweetItem.js';

class TweetList extends Component{
    render () {
    return(
        <React.Fragment>
            {
                this.props.listOfTweets.map((tweet)=>
                {return <TweetItem tweetObject={tweet} removeTweet={this.props.removeTweet.bind(this)}  key={tweet._id}/>;}
                )
            }
        </React.Fragment>
    )
    }
}

export default TweetList;