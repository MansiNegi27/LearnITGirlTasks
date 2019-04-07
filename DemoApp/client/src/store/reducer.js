const initialState = {
    listOfTweets :[]
};

const reducer = (state = initialState, action)=>{
    switch (action.type) {

        case "REMOVE TWEET":
            return {...state,listOfTweets: action.data};
        case "GET TWEETS":
            return {...state,listOfTweets: action.data};
        default:
            return {...state};

    }
};

export default reducer;
