import React, { Component } from 'React'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Linkify from 'linkifyjs/react'
import { shell } from 'electron'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import Favorite from './Favorite'
import Retweet from './Retweet'
import ToolButton from './ToolButton'

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
    padding: '1em',
    borderBottom: '1px solid #f5f5f5'
  },
  retweet: {
    paddingLeft: 48,
    marginBottom: '0.25em'
  },
  tweet: {
    display: 'flex',
    fontSize: 12,
    lineHeight: 1.5
  },
  icon: {
    flex: '0 0 auto',
    paddingRight: '0.5em'
  },
  body: {
    flex: '1 1 auto',
    minWidth: 0
  },
  bodyText: {
    marginBottom: '0.25em'
  },
  image: {
    marginTop: '0.25em',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 2
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '0.25em'
  }
}

class Tweet extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.tweet.id !== nextProps.tweet.id
  }

  renderRetweetInfo () {
    if (isRetweet(this.props.tweet)) {
      const { classes } = this.props
      return (
        <div className={classes.retweet}>
          <Typography type="caption">
            retweet {`${this.props.tweet.user.name}`}
          </Typography>
        </div>
      )
    } else {
      return null
    }
  }

  renderImage (imageObj) {
    const { classes } = this.props

    if (imageObj) {
      return (
        <div>
          <img src={imageObj.media_url_https} className={classes.image} />
        </div>
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

    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.renderRetweetInfo()}

        <div className={classes.tweet}>
          <div className={classes.icon}>
            <Avatar src={status.user.profile_image_url_https} />
          </div>

          <div className={classes.body}>
            <div className={classes.name}>{`${status.user.name}@${status.user.screen_name}`}</div>

            <div className={classes.bodyText}>
              <Linkify options={linkifyOptions} onClick={handleLink}>
                {status.text}
              </Linkify>

              {this.renderImage(firstImage)}
            </div>

            <div>
              <ToolButton ariaLabel="reply" size={17}>
              chat_bubble_outline
              </ToolButton>

              <Favorite active={status.favorited} id={status.id_str} />

              <Retweet active={status.retweeted} id={status.id_str} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tweet)
