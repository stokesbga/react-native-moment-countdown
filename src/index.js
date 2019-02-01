import React, { Component } from 'react'
import { oneOfType, func, instanceOf, string } from 'prop-types'
import { momentObj } from 'react-moment-proptypes'
import {
  Text
} from 'react-native'
import formatDate from './format-date'

import TimerEnhance from 'react-native-smart-timer-enhance'
class ReactMomentCountDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countdown: null
    }
  }

  componentDidMount() {
    this.tick()

    this.timer = this.setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    this.clearInterval(this.timer)
  }

  tick() {
    const { toDate, sourceFormatMask, targetFormatMask, onCountdownEnd, onTick } = this.props
    const [delta, countdown] = formatDate(toDate, targetFormatMask, sourceFormatMask)

    if (delta <= 0) {
      this.clearInterval(this.timer)

      if (onCountdownEnd) {
        onCountdownEnd()
      }
    }

    this.setState({
      countdown
    })

    if (onTick) {
      onTick(delta)
    }
  }
  render() {
    return (
      <Text style={this.props.timeStyle}>
        {this.state.countdown == "Invalid date" ? 
          this.props.expiredLabel : this.state.countdown}
      </Text>
    )
  }
};

ReactMomentCountDown.propTypes = {
  toDate: oneOfType([
    momentObj,
    instanceOf(Date),
    string
  ]).isRequired,
  expiredLabel: string,
  sourceFormatMask: string,
  targetFormatMask: string,
  onTick: func,
  onCountdownEnd: func
}

ReactMomentCountDown.defaultProps = {
  sourceFormatMask: 'YYYY-MM-DD',
  targetFormatMask: 'HH:mm:ss',
  expiredLabel: "Expired",
  onTick: null,
  onCountdownEnd: null
}

export default TimerEnhance(ReactMomentCountDown)
