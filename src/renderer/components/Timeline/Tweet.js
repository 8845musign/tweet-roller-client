import React, { Component } from 'React'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Linkify from 'linkifyjs/react'
import { shell } from 'electron'

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

export default class Tweet extends Component {
  render () {
    const status = isRetweet(this.props.tweet) ? this.props.tweet.retweeted_status : this.props.tweet
    const media = status.entities.media || []
    const firstImage = media.find((item) => {
      return item.type === 'photo'
    })

    return (
      <div>
        <div>
          <Avatar src={status.user.profile_image_url_https} />
          {`${status.user.name}@${status.user.screen_name}`}
        </div>

        <Linkify options={linkifyOptions} onClick={handleLink}>
          {status.text}
        </Linkify>
      </div>
    )
  }
}

Tweet.propTypes = {
  tweets: PropTypes.array.isRequired
}
