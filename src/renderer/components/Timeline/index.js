import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTweet, addTweets } from '../../actions'
import TwitterService from '../../services/twitter'
import List from './List'

class Timeline extends Component {
  componentDidMount () {
    TwitterService.getHomeTimeline()
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        this.props.addTweets(result.data)

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
      this.props.addTweet(tweet)
    })
  }

  render () {
    return (
      <List
        tweets={this.props.tweets}
      />
    )
  }
}

Timeline.propTypes = {
  tweets: PropTypes.array.isRequired,
  addTweet: PropTypes.func.isRequired,
  addTweets: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tweets: state.tweets
  }
}

const mapDispatchToProps = {
  addTweet,
  addTweets
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
