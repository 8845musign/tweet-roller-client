import React, { Component } from 'React'
import PropTypes from 'prop-types'

import Tweet from './Tweet'

export default class TweetList extends Component {
  render () {
    const tweets = this.props.tweets.map((tweet) => {
      return <Tweet tweet={tweet} key={tweet.id} />
    })

    return (
      <div>
        {tweets}
      </div>
    )
  }
}

TweetList.propTypes = {
  tweets: PropTypes.array.isRequired
}
