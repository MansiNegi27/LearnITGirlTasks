import React, { Component } from 'react';
import './App.css';
import TweetList from './components/tweetList.js';
import { connect } from 'react-redux';
import axios from 'axios';
import store from './store/store';

function getTweets(dispatch){
    axios.get('http://localhost:5000/api/tweets/')
        .then(res => {
            dispatch({type:'GET TWEETS',data : res.data });
        })
        .catch((err) =>{
            dispatch({type:'ERROR',err: err });
        })
}

class App extends Component {

    removeTweet =(id)=> {
        axios.delete('http://localhost:5000/api/tweets/'+id)
            .then(res => {
                let newList = [];
                let i = 0;
                this.props.listOfTweets.forEach((tweet)=>{
                    if(id !== tweet._id)
                    {
                        newList[i++] = tweet;
                    }
                });
                store.dispatch({type : 'REMOVE TWEET',data : newList});
            })
            .catch(err =>{
                store.dispatch({type:'ERROR',err: err });
            })
    };

   componentDidMount() {
        this.props.getTweets();
    };

  render() {
    return (
      <div className="App">
        <TweetList listOfTweets={this.props.listOfTweets} removeTweet={this.removeTweet.bind(this)}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getTweets : ()=>dispatch(getTweets)
        //,removeData : (id)=>dispatch(removeData(id,dispatch))
    }
};

const mapStateToProps = (state) =>{
    return {
        listOfTweets : state.listOfTweets
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
