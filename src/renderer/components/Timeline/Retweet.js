import React from 'react'
import PropTypes from 'prop-types'

import TwitterService from '../../services/twitter'
import ToolButton from './ToolButton'

export default class Retweet extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: this.props.active
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.state.active) {
      TwitterService
        .postUnRetweet(this.props.id)
        .catch(err => { console.log('error:' + err) })
        .then(() => {
          this.setState({ active: false })
        })
    } else {
      TwitterService
        .postRetweet(this.props.id)
        .catch(err => { console.log('error:' + err) })
        .then(() => {
          this.setState({ active: true })
        })
    }
  }

  render () {
    return (
      <ToolButton ariaLabel="retweet" onClick={this.handleClick}>
        autorenew
      </ToolButton>
    )
  }
}

Retweet.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool
}

Retweet.defaultProps = {
  active: false
}
