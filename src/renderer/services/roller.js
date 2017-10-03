const isRetweet = (tweet) => {
  return tweet.hasOwnProperty('retweeted_status')
}

const getStatus = (tweet) => {
  return isRetweet(tweet)
    ? tweet.retweeted_status
    : tweet
}

export const countRoll = (tweets) => {
  return tweets.reduce((cnt, tweet) => {
    const status = getStatus(tweet)
    const nums = status.text.match(/コロ.*?([0-9]{1,2}).*?([0-9]{1,2})/)

    if (nums && nums.length > 2) {
      return cnt + (nums[1] * nums[2])
    } else {
      return cnt
    }
  }, 0)
}
