import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppointmentManager from './AppointmentManager.jsx';

class DateCell extends Component {
  constructor(props){
    super(props);

    this.cellClasses = "cell";
    if(this.props.isNull){
      this.cellClasses += " nullCell";
    } else if (this.props.isPast){
      this.cellClasses += " disabledCell"
    } else {
      this.cellClasses += " dateCell"
    }
  }
  render(){
    return(
      <div className={this.cellClasses}>
        <span>{this.props.day || "null"}</span>
        {(this.props.isNull || this.props.isPast) ? null : <AppointmentManager/>}
      </div>
    )
  }
}

DateCell.propTypes = {
  day: PropTypes.number,
  isNull: PropTypes.bool,
  isPast: PropTypes.bool
}

export default DateCell;
