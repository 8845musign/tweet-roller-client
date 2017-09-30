export const addTweets = tweets => state => {
  return Object.assign({},
    ...state,
    { tweets: [
      ...tweets,
      ...state.tweets
    ]}
  )
}

export const addTweet = tweet => state => {
  return Object.assign({},
    ...state,
    { tweets: [
      tweet,
      ...state.tweets
    ]}
  )
}
