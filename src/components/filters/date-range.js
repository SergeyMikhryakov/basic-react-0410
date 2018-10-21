import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setDateRange } from '../../ac'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
  static propTypes = {
    dateRange: PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date)
    })
  }

  handleDayClick = (day) => {
    this.props.setDateRange(DateUtils.addDayToRange(day, this.props.dateRange))
  }

  render() {
    const { from, to } = this.props.dateRange
    const selectedRange =
      from && to && `${from.toDateString()} - ${to.toDateString()}`
    return (
      <div className="date-range">
        <DayPicker
          selectedDays={(day) => DateUtils.isDayInRange(day, { from, to })}
          onDayClick={this.handleDayClick}
        />
        {selectedRange}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    dateRange: state.filter.dateRange
  }),
  { setDateRange }
)(DateRange)
