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
import Pomp from './Pomp'

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
      value: '',
      isPomping: false,
      pompCount: 0
    }

    this.pomp = new Pomp(10)

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClickPomp = this.handleClickPomp.bind(this)
  }

  handleKeyPress (e) {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      this.Pomp()
    }
  }

  Pomp () {
    this.pomp.init()

    this.setState({
      isPomping: true
    })
  }

  tweet () {
    TwitterService.postTweet(this.state.value.trim())
      .catch(error => console.log(error))
      .then(
        result => {
          this.setState({ value: '' })
          this.props.onClose()
        }
      )
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleClickPomp () {
    this.pomp.up()
    this.setState({
      pompCount: this.pomp.getCount()
    })

    if (this.pomp.isEnd()) {
      this.tweet()
      this.pomp.init()
      this.setState({
        isPomping: false,
        pompCount: 0
      })
    }
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
            disabled={this.state.isPomping}
          />

          <FormHelperText>
            ( Shift + Enter ) {this.state.value.length} / 140
          </FormHelperText>
        </FormControl>

        <div>
          pomp {this.state.pompCount}
          {
            this.state.isPomping
              ? <button type="button" onClick={this.handleClickPomp}>pomp</button>
              : null
          }
        </div>
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
