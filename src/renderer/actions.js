import TwitterService from './services/twitter'

const isDuplicate = (tweet, ids) => {
  return ids.includes(tweet.id)
}

export const addTweets = (tweets, target = 'tweet') => state => {
  const tweetsUnique = tweets.filter(tweet => {
    return !isDuplicate(tweet, state[`${target}Ids`])
  })
  const ids = tweetsUnique.map(tweet => tweet.id)

  return Object.assign({},
    state,
    {
      [`${target}s`]: [ ...tweetsUnique, ...state[`${target}s`] ],
      [`${target}Ids`]: [ ...ids, ...state[`${target}Ids`] ]
    }
  )
}

export const addTweet = (tweet, target = 'tweet') => state => {
  return Object.assign({},
    state,
    {
      [`${target}s`]: [ tweet, ...state[`${target}s`] ],
      [`${target}Ids`]: [ tweet.id, ...state[`${target}Ids`] ]
    }
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
