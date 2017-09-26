import Twit from 'twit'

class TwitterService {
  constructor () {
    this.twit = new Twit({
      consumer_key: 'fC41fo3votFK5SObdBXRRnK1O',
      consumer_secret: 'fWyNyRXb2cFjvSCoOxTW1pz0h19wJbGiytTHsW61aJdCx6Mtpf',
      access_token: '243676362-34wlnuL77qvULFgbDzcrBtAw88fxJe0Xqo8qVOlB',
      access_token_secret: 'qF5MtfU5umQK3w0HyYO9dX0blB0OzgOsfjgPDAnufih5U'
    })
  }

  getHomeTimeline () {
    return this.twit.get('statuses/home_timeline')
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
