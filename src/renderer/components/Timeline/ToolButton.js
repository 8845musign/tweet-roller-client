import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'

export default class ToolButton extends React.Component {
  render () {
    const size = this.props.size ? this.props.size : 20

    return (
      <IconButton
        style={{
          width: 30,
          height: 30
        }}
        aria-label={this.props.ariaLabel}
      >
        <Icon
          onClick={this.props.onClick}
          style={{
            fontSize: size
          }}
        >
          {this.props.children}
        </Icon>
      </IconButton>
    )
  }
}

ToolButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  size: PropTypes.number
}
