import React, { Component } from 'React'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Linkify from 'linkifyjs/react'
import { shell } from 'electron'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'

const isRetweet = (tweet) => {
  return tweet.hasOwnProperty('retweeted_status')
}

const handleLink = (e) => {
  e.preventDefault()

  shell.openExternal(
    e.target.href,
    { options: true }
  )
}

const linkifyOptions = {
  target: {
    url: '_blank'
  }
}

const styles = {
  root: {
    display: 'flex',
    padding: '0.5em 0.25em',
    borderBottom: '1px solid #f7f7f7'
  },
  icon: {
    flex: '0 0 auto',
    paddingRight: '0.5em'
  },
  body: {
    flex: '1 1 auto',
    minWidth: 0
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}

class Tweet extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.tweet.id !== nextProps.tweet.id
  }

  renderRetweetInfo () {
    if (isRetweet(this.props.tweet)) {
      return (
        <Typography type="caption">
          retweet {`${this.props.tweet.user.name}`}
        </Typography>
      )
    } else {
      return null
    }
  }

  render () {
    const status = isRetweet(this.props.tweet) ? this.props.tweet.retweeted_status : this.props.tweet
    const media = status.entities.media || []
    const firstImage = media.find((item) => {
      return item.type === 'photo'
    })

    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.icon}>
          <Avatar src={status.user.profile_image_url_https} />
        </div>

        <div className={this.props.classes.body}>
          {this.renderRetweetInfo()}
          <div className={this.props.classes.name}>{`${status.user.name}@${status.user.screen_name}`}</div>
          <Linkify options={linkifyOptions} onClick={handleLink}>
            {status.text}
          </Linkify>

          <div>
            <Typography type="caption">
              <Icon>chat_bubble_outline</Icon>
              <Icon>star_border</Icon>
              <Icon>autorenew</Icon>
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

Tweet.propTypes = {
  tweets: PropTypes.array.isRequired
}

export default withStyles(styles)(Tweet)
