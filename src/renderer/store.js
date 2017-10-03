import Store from 'repatch'
import { logger } from './middlewares'

export default new Store({
  tab: 0,
  tweets: [],
  tweetIds: [],
  searchs: [],
  searchIds: [],
  notifycations: [],
  tweetValue: '',
  isOpenTweet: false,
  isPomping: false,
  pompMax: 10,
  pompCount: 0
}).addMiddleware(logger)
