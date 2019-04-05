import React, { Component } from 'react'

class TweetItem extends Component{

        render(){
            return(
                <React.Fragment>
                <h1>{this.props.tweetObject.tweetBody}</h1>
                <button onClick={this.props.removeTweet.bind(this,this.props.tweetObject._id)}>Remove</button>
                </React.Fragment>
            )
        }
}

export default TweetItem;