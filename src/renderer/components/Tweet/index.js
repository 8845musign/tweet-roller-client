import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'

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
        .then(
          result => {
            this.setState({ value: '' })
            this.props.onClose()
          }
        )
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

    const { classes } = this.props

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onRequestClose={this.props.onClose}
        transition={<Slide direction="up" />}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Tweet
            </Typography>
          </Toolbar>
        </AppBar>

        <FormControl
          className={classes.root}
          error={error}
          style={{ paddingTop: 56 }}
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
      </Dialog>
    )
  }
}

Tweet.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(Tweet)
