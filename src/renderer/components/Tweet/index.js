import React, { Component } from 'React'
import { FormControl, FormHelperText } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import TwitterService from '../../services/twitter'

const styles = {
  root: {
    width: '100%',
    marginBottom: 20
  }
}

class Tweet extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleKeyPress (e) {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()

      TwitterService.postTweet(this.state.value.trim())
        .catch(error => console.log(error))
        .then(result => this.setState({ value: '' }))
    }
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  render () {
    let error = false
    if (this.state.value.length > 140) {
      error = true
    }

    return (
      <FormControl
        className={this.props.classes.root}
        error={error}
      >
        <TextField
          id="multiline-flexible"
          label="Tweet"
          multiline
          rowsMax="4"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />

        <FormHelperText>
          ( Shift + Enter ) {this.state.value.length} / 140
        </FormHelperText>
      </FormControl>
    )
  }
}

export default withStyles(styles)(Tweet)
