import TwitterService from './services/twitter'

export const addTweets = tweets => state => {
  return Object.assign({},
    state,
    { tweets: [
      ...tweets,
      ...state.tweets
    ]}
  )
}

export const addTweet = tweet => state => {
  return Object.assign({},
    state,
    { tweets: [
      tweet,
      ...state.tweets
    ]}
  )
}

export const openTweet = _ => state => {
  return Object.assign({},
    state,
    { isOpenTweet: true }
  )
}

export const closeTweet = _ => state => {
  return Object.assign({},
    state,
    { isOpenTweet: false }
  )
}

export const editTweetValue = value => state => {
  return Object.assign({},
    state,
    { tweetValue: value }
  )
}

export const startPomp = _ => state => {
  return Object.assign({},
    state,
    {
      isPomping: true,
      pompCount: 0,
      openTweet: false
    }
  )
}

const endPomp = state => {
  TwitterService.postTweet(state.tweetValue.trim())
    .catch(error => console.log(error))

  return Object.assign({},
    state,
    {
      isPomping: false,
      pompCount: 0,
      isOpenTweet: false,
      tweetValue: ''
    }
  )
}

const pompUp = state => {
  return Object.assign({},
    state,
    { pompCount: ++state.pompCount }
  )
}

export const pomp = _ => state => {
  if (state.isPomping && state.pompCount < 9) {
    return pompUp(state)
  }

  if (state.isPomping && state.pompCount >= 9) {
    return endPomp(state)
  }

  // when no pomping, nothing do.
  return state
}
