import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTweet, addTweets, setPompMax } from '../actions'
import TwitterService from '../services/twitter'
import { countRoll } from '../services/roller'
import TweetList from './TweetList'

class Searchs extends Component {
  componentDidMount () {
    TwitterService.getSearchTimeline()
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        const { statuses } = result.data
        this.props.addTweets(statuses, 'search')

        if (countRoll(statuses) > 100) {
          this.props.setPompMax(5)
        } else {
          this.props.setPompMax(10)
        }

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
  addTweets: PropTypes.func.isRequired,
  setPompMax: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tweets: state.searchs
  }
}

const mapDispatchToProps = {
  addTweet,
  addTweets,
  setPompMax
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchs)
