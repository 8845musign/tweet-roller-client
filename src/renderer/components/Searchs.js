import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTweet, addTweets } from '../actions'
import TwitterService from '../services/twitter'
import TweetList from './TweetList'

class Searchs extends Component {
  componentDidMount () {
    TwitterService.getSearchTimeline()
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        console.log('result', result)
        this.props.addTweets(result.data.statuses, 'search')

        this.setState({ tweets: result.data })
        this.connectStream()
      })
  }

  connectStream () {
    this.stream = TwitterService.connectStreamUser()

    this.stream.on('error', error => {
      throw error
    })

    this.stream.on('tweet', tweet => {
      this.props.addTweet(tweet, 'search')
    })
  }

  render () {
    return (
      <TweetList
        tweets={this.props.tweets}
      />
    )
  }
}

Searchs.propTypes = {
  tweets: PropTypes.array.isRequired,
  addTweet: PropTypes.func.isRequired,
  addTweets: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tweets: state.searchs
  }
}

const mapDispatchToProps = {
  addTweet,
  addTweets
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchs)
