import React, { Component } from 'React'
import TwitterService from '../services/twitter'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import PhoneIcon from 'material-ui-icons/Phone'

import Tweet from './Tweet'
import Timeline from './Timeline'

export default class MainContent extends Component {
  componentDidMount () {
    TwitterService.getHomeTimeline()
      .catch(error => {
        console.log(error)
      })
      .then(result => {
        this.setState({ tweets: result.data })
        this.connectStream()
      })
  }

  connectStream () {
    const stream = TwitterService.connectStreamUser()

    stream.on('error', error => {
      throw error
    })

    stream.on('tweet', tweet => {
      const { tweets } = this.state

      this.setState({
        tweets: [
          tweet,
          ...tweets
        ]
      })
    })
  }

  handleChangeTab (event, value) {
    this.setState({
      tab: value
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      tweets: [],
      tab: 0
    }

    this.handleChangeTab = this.handleChangeTab.bind(this)
  }

  render () {
    return (
      <div>
        <Tabs
          value={this.state.tab}
          onChange={this.handleChangeTab}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={PhoneIcon} />
          <Tab icon={PhoneIcon} />
          <Tab icon={PhoneIcon} />
        </Tabs>

        <div style={{ paddingTop: 64 }}>
          <Tweet />
          <Timeline tweets={this.state.tweets} />
        </div>
      </div>
    )
  }
}
