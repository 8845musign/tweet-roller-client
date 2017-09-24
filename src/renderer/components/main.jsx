import React, { Component } from 'React'
import TwitterService from '../services/twitter'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import Tweet from './Tweet'
import Timeline from './Timeline'

export default class MainContent extends Component {
  componentDidMount () {
    TwitterService.get('statuses/home_timeline')
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        this.setState({ tweets: result.data })
        this.connectStream()
      })
  }

  connectStream () {
    const stream = TwitterService.stream('user')

    stream.on('error', error => {
      throw error
    })

    stream.on('tweet', tweet => {
      console.log('here')
      console.log(tweet)
      const { tweets } = this.state

      console.log(
        [
          tweet,
          ...tweets
        ]
      )

      this.setState({
        tweets: [
          tweet,
          ...tweets
        ]
      })
    })
  }

  constructor (props) {
    super(props)

    this.state = { tweets: [] }
  }

  render () {
    return (
      <div>
        <AppBar
          position="fixed"
          title="Tweet Roller"
        >
          <Toolbar>
            <Typography type="title" color="inherit">
              Tweet Roller
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ paddingTop: 64 }}>
          <Tweet />
          <Timeline tweets={this.state.tweets} />
        </div>
      </div>
    )
  }
}
