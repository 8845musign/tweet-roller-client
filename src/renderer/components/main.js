import React, { Component } from 'React'
import PropTypes from 'prop-types'
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
import { openTweet } from '../actions'

import Timeline from './Timeline'
import Searchs from './Searchs'
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
            <Timeline />
          </TabContainer>
        )
      case 1:
        return (
          <TabContainer>
            <Searchs />
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
  openTweet: PropTypes.func.isRequired
}

const styled = withStyles(styles)(MainContent)

const mapDispatchToProps = {
  openTweet
}

export default connect(null, mapDispatchToProps)(styled)
