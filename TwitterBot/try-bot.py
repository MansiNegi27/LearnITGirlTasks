import tweepy as tp
import time

list_of_all_tweets = []
prev_id = 0
# @TODO : enter a valid tweet id in the above one!


class Tweet:

    def __init__(self, tweetID, tweetUser):
        self.tweetID = tweetID
        self.tweetStatus = "created"
        self.tweetBody = ""
        self.msgID = 0
        self.tweetUser = tweetUser
        self.tweetLocation = ""

    def getLocationFromUser(self):
        msg = "@"+self.tweetUser+" Kindly tell us the location:"
        updated_status = api.update_status(status=msg, in_reply_to_status_id=self.tweetID)
        self.msgID = updated_status._json["id"]
        self.tweetStatus = "locationAsked"

    def getStatusFromUser(self):
        msg = "@"+self.tweetUser+" Kindly tell us about the condition of the animal:"
        loc_status = api.user_timeline(screen_name=self.tweetUser, count=5)
        for user_status in loc_status:
            if self.msgID == user_status._json["in_reply_to_status_id"]:
                newTweetID = user_status._json["id"]
                self.tweetLocation = user_status._json["text"]
                self.tweetStatus = "bodyAsked"
                updated_status = api.update_status(status=msg, in_reply_to_status_id=newTweetID)
                self.msgID = updated_status._json["id"]

    def sendRequestToServer(self):
        msg = "@"+self.tweetUser+" Thank you for being patient, the incident has been reported"
        bod_status = api.user_timeline(screen_name=self.tweetUser,count=5)
        for body in bod_status:
            if self.msgID == body._json["in_reply_to_status_id"] :
                newTweetID = body._json["id"]
                self.tweetBody = body._json["text"]
                print("request sent to server")
                self.tweetStatus = "finished"
                updated_status = api.update_status(status=msg, in_reply_to_status_id=newTweetID)
                print(self.tweetBody)

def get_new_tweets(prevId):
    mentions = api.mentions_timeline(since_id=prevId)
    i = len(list_of_all_tweets)
    for mention in mentions:
        if str(mention._json["in_reply_to_status_id"]) == "None":
            TweetId = mention._json["id"]
            user = mention._json["user"]["screen_name"]
            if TweetId > prevId:
                prevId = TweetId
            tweet = Tweet(tweetID=TweetId, tweetUser=user)
            list_of_all_tweets.append(tweet)
            print("Replying to user", list_of_all_tweets[i].tweetUser)
            msg = "Hey, @" + list_of_all_tweets[i].tweetUser + " thanks for reaching out. Kindly respond to some questions"
            # @TODO Uncomment this when completed testing
            updated_status = api.update_status(status=msg, in_reply_to_status_id=list_of_all_tweets[i].tweetID, auto_populate_reply_metadata=True)
            i += 1
    return prevId

# @TODO enter the credentials as well
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''


auth = tp.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tp.API(auth)

prev_id = get_new_tweets(prev_id)
for t in list_of_all_tweets:
    if t.tweetStatus == "created":
        t.getLocationFromUser()

while True:
    # Search for new Tweets
    prev_id = get_new_tweets(prev_id)
    for t in list_of_all_tweets:
        # when tweet is created  ask for location
        if t.tweetStatus == "created":
            print("Asking for Location")
            t.getLocationFromUser()
        # when tweet has location Ask for body  
        elif t.tweetStatus == "locationAsked":
            print("Asking for Body")
            t.getStatusFromUser()
        # when tweet has body, send a request to server
        elif t.tweetStatus == "bodyAsked":
            print("Sending the request")
            t.sendRequestToServer()

        # delete the finished tweets
        elif t.tweetStatus == "finished":
            print("deleting the tweetObject")
            list_of_all_tweets.remove(t)
    time.sleep(30)