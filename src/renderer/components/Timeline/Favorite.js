import React from 'react'
import PropTypes from 'prop-types'

import TwitterService from '../../services/twitter'
import ToolButton from './ToolButton'
export default class Favorite extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: this.props.active
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    TwitterService
      .postFavorite(this.props.id)
      .catch(err => { console.log('error:' + err) })
      .then(() => {
        this.setState({ active: true })
      })
  }

  render () {
    const icon = this.state.active ? 'star' : 'star_border'

    return (
      <ToolButton aria-label="favorite" onClick={this.handleClick}>
        {icon}
      </ToolButton>
    )
  }
}

Favorite.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool
}

Favorite.defaultProps = {
  active: false
}
