import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateCell from './DateCell.jsx';

let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Calendar App is date-agnostic, can be given any date to use
 */

class CalendarApp extends Component {
  constructor(props) {
    super(props);

    if(props.date.getMonth()===1 && props.isLeapYear===true){
      monthDays[1] = 29;
    }
    this.getDateCells = this.getDateCells.bind(this);
  }

  getDateCells(){
    let firstDay = 1 + this.props.date.getDay() - (this.props.date.getDate()%7);
    firstDay = firstDay % 7;
    let today = this.props.date.getDate();
    let dateCells = [];
    let days = monthDays[this.props.date.getMonth()];
    for(let i=0-firstDay; i < days; ++i){
      if(i < 0){
        dateCells.push(<DateCell key={i+1} isNull={true}></DateCell>);
      } else {
        dateCells.push(<DateCell key={i+1} day={i+1} isPast={today > i+1}></DateCell>)
      }
    }
    return dateCells;
  }

  render() {
    return(
      <div className="calendarMain">
        <div className="titleBar">{monthNames[this.props.date.getMonth()]}</div>
        <div>
          {this.getDateCells()}
        </div>
      </div>
    );
  }
}

CalendarApp.propTypes = {
  date: PropTypes.object.isRequired,
  isLeapYear: PropTypes.bool.isRequired
}

export default CalendarApp;
