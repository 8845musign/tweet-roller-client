import React, { Component } from 'React'
import PropTypes from 'prop-types'
import TwitterService from '../services/twitter'
import Tabs, { Tab } from 'material-ui/Tabs'
import HomeIcon from 'material-ui-icons/Home'
import SearchIcon from 'material-ui-icons/Search'
import EmailIcon from 'material-ui-icons/Email'
import NotificationsIcon from 'material-ui-icons/Notifications'
import { withStyles } from 'material-ui/styles'

import Tweet from './Tweet'
import Timeline from './Timeline'

const styles = {
  scrollable: {
    height: 'calc(100vh - 48px)',
    overflowY: 'auto'
  }
}

class MainContent extends Component {
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
    const { classes } = this.props

    return (
      <div>
        <Tabs
          value={this.state.tab}
          onChange={this.handleChangeTab}
          fullWidth
        >
          <Tab icon={<HomeIcon />} />
          <Tab icon={<SearchIcon />} />
          <Tab icon={<NotificationsIcon />} />
          <Tab icon={<EmailIcon />} />
        </Tabs>

        <div className={classes.scrollable}>
          <Tweet />
          <Timeline tweets={this.state.tweets} />
        </div>
      </div>
    )
  }
}

MainContent.PropTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainContent)
