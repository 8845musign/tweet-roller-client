import { Component } from 'React'
import TwitterService from '../services/twitter'

const isRetweet = (tweet) => {
  return tweet.hasOwnProperty('retweeted_status')
}

class Tweet extends Component {
  componentDidMount() {
    T.get('statuses/home_timeline')
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        this.setState({ tweets: result.data })
        this.connectStream()
      })
  }

connectStream() {
    const stream = T.stream('user')

    stream.on('error', error => {
      throw error
    })

    stream.on('tweet', tweet => {
      const { tweets } = this.state

      this.setState({
        tweets: [
          ...tweets,
          tweet
        ]
      })
    })
  }

  render() {
    const isRetweet = isRetweet(this.props.tweet)

    const status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet
    const media = status.entities.media || [];
    const firstImage = media.find((item) => {
      return item.type === 'photo';
    })

    return (
      <li>
        <img src={status.user.profile_image_url_https} alt=""/>
        {status.user.name}
        @{status.user.screen_name}
        <p>
          {status.text}
        </p>
      </li>
    )
  }
}

class Timeline extends Component {
  render() {
    const tweets = this.props.tweets.map((tweet) => {
      return <Tweet tweet={tweet} key={tweet.id} />
    })

    return 
  }
}

module.exports = class MainContent extends Component {
  constructor(props) {
    super(props)

    this.state = { tweets: [] };
  }

  render() {
    return (
      <div>
        <Timeline tweets={this.state.tweets} />
      </div>
    )
  }
}