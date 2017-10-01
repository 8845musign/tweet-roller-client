import React, { Component } from 'React'
import PropTypes from 'prop-types'
import TwitterService from '../services/twitter'
import Tabs, { Tab } from 'material-ui/Tabs'
import HomeIcon from 'material-ui-icons/Home'
import SearchIcon from 'material-ui-icons/Search'
import EmailIcon from 'material-ui-icons/Email'
import NotificationsIcon from 'material-ui-icons/Notifications'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import CreateIcon from 'material-ui-icons/Create'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { addTweet, addTweets, openTweet } from '../actions'

import Timeline from './Timeline'
import Tweet from './Tweet'

const TabContainer = (props) => {
  return (
    <div style={{ paddingTop: 48 }}>{ props.children }</div>
  )
}

TabContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
}

const styles = {
  btnTweet: {
    position: 'fixed',
    bottom: '1em',
    right: '1em',
    zIndex: 1000
  }
}

class MainContent extends Component {
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
    const stream = TwitterService.connectStreamUser()

    stream.on('error', error => {
      throw error
    })

    stream.on('tweet', tweet => {
      this.props.addTweet(tweet)
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
      tab: 0
    }

    this.handleChangeTab = this.handleChangeTab.bind(this)
  }

  renderTabContent () {
    switch (this.state.tab) {
      case 0:
        return (
          <TabContainer>
            <Timeline tweets={this.props.tweets} />
          </TabContainer>
        )
      case 1:
        return (
          <TabContainer>
            検索
          </TabContainer>
        )
      case 2:
        return (
          <TabContainer>
            通知
          </TabContainer>
        )
      case 3:
        return (
          <TabContainer>
            DM
          </TabContainer>
        )
      default:
        return null
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <AppBar>
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
        </AppBar>

        <div>
          {this.renderTabContent()}
        </div>

        <Button
          fab
          className={classes.btnTweet}
          color="accent"
          aria-label="tweet"
          onClick={this.props.openTweet}
        >
          <CreateIcon />
        </Button>
        <Tweet />
      </div>
    )
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired,
  addTweet: PropTypes.func.isRequired,
  addTweets: PropTypes.func.isRequired,
  openTweet: PropTypes.func.isRequired
}

const styled = withStyles(styles)(MainContent)

const mapStateToProps = state => {
  return {
    tweets: state.tweets
  }
}

const mapDispatchToProps = {
  addTweet,
  addTweets,
  openTweet
}

export default connect(mapStateToProps, mapDispatchToProps)(styled)
