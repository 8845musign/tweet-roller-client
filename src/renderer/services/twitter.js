import Twit from 'twit'

class TwitterService {
  constructor () {
    this.twit = new Twit({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    })
  }

  getHomeTimeline () {
    return this.twit.get('statuses/home_timeline')
  }

  getSearchTimeline (q = '#フロントエンドゆるふわ筋トレ部') {
    return this.twit.get('search/tweets', { q })
  }

  connectStreamUser () {
    return this.twit.stream('user')
  }

  postTweet (status) {
    const params = { status }
    return this.twit.post('statuses/update', params)
  }

  postFavorite (id) {
    const params = { id }
    return this.twit.post('favorites/create', params)
  }

  postRetweet (id) {
    return this.twit.post(`statuses/retweet/${id}`)
  }

  postUnRetweet (id) {
    return this.twit.post(`statuses/unretweet/${id}`)
  }
}

export default new TwitterService()
