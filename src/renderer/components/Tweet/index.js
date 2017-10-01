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
import { connect } from 'react-redux'
import { editTweetValue, startPomp, closeTweet, pomp } from '../../actions'

const styles = {
  root: {
    width: '100%',
    marginBottom: 20
  }
}

class Tweet extends Component {
  constructor (props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleKeyPress (e) {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      this.props.startPomp()
    }
  }

  handleChange (e) {
    this.props.editTweetValue(e.target.value)
  }

  render () {
    let error = false

    if (this.props.tweetValue.length > 140) {
      error = true
    }

    const { classes } = this.props

    return (
      <Dialog
        fullScreen
        open={this.props.isOpenTweet}
        onRequestClose={this.props.closeTweet}
        transition={<Slide direction="up" />}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.closeTweet} aria-label="Close">
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
            value={this.props.tweetValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            disabled={this.props.isPomping}
          />

          <FormHelperText>
            ( Shift + Enter ) {this.props.tweetValue.length} / 140
          </FormHelperText>
        </FormControl>

        <div>
          pomp {this.props.pompCount}
          {
            this.props.isPomping
              ? <button type="button" onClick={this.props.pomp}>pomp</button>
              : null
          }
        </div>
      </Dialog>
    )
  }
}

Tweet.propTypes = {
  classes: PropTypes.object,
  tweetValue: PropTypes.string.isRequired,
  isPomping: PropTypes.bool.isRequired,
  pompCount: PropTypes.number.isRequired,
  editTweetValue: PropTypes.func.isRequired,
  startPomp: PropTypes.func.isRequired,
  pomp: PropTypes.func.isRequired,
  closeTweet: PropTypes.func.isRequired,
  isOpenTweet: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    tweetValue: state.tweetValue,
    isPomping: state.isPomping,
    pompCount: state.pompCount,
    isOpenTweet: state.isOpenTweet
  }
}

const mapDispatchToProps = {
  editTweetValue,
  startPomp,
  pomp,
  closeTweet
}

const styled = withStyles(styles)(Tweet)

export default connect(mapStateToProps, mapDispatchToProps)(styled)
