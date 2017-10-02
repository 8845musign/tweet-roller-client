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
  pompCount: 0
}).addMiddleware(logger)
