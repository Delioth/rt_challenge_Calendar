import React, {Component} from 'react';
import PropTypes from 'prop-types';

let labels=['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12AM'];

class Appointment extends Component {
  constructor(props){
    super(props);

    this.state={selectingStart: false, selectingEnd: false}

    this.getStart = this.getStart.bind(this);
    this.selectStart = this.selectStart.bind(this);
    this.doChangeStart = this.doChangeStart.bind(this);

    this.getEnd = this.getEnd.bind(this);
    this.selectEnd = this.selectEnd.bind(this);
    this.doChangeEnd = this.doChangeEnd.bind(this);

    this.deleteSelf = this.deleteSelf.bind(this);
  }

  getStart(){
    if(this.state.selectingStart){
      return(this.getSelector(this.doChangeStart, this.props.start));
    } else {
      return(<span onClick={this.selectStart}>{labels[this.props.start]}</span>);
    }
  }
  selectStart(){
    this.setState({selectingStart:true});
  }
  doChangeStart(e){
    this.props.editAppointment(this.props.name, e.target.value, this.props.end);
    this.setState({selectingStart:false});
  }

  getEnd(){
    if(this.state.selectingEnd){
      return(this.getSelector(this.doChangeEnd, this.props.end));
    } else {
      return(<span onClick={this.selectEnd}>{labels[this.props.end]}</span>);
    }
  }
  selectEnd(){
    this.setState({selectingEnd:true});
  }
  doChangeEnd(e){
    this.props.editAppointment(this.props.name, this.props.start, e.target.value);
    this.setState({selectingEnd:false});
  }

  getSelector(func, val){
    return(
      <select className="inlineSelector" onChange={func} value={val}>
        {labels.map((label, idx)=>{
          return(<option key={idx.toString()} value={idx}>{label}</option>)
        })}
      </select>
    );
  }

  deleteSelf(){
    this.props.removeSelf(this.props.name);
  }

  render(){
    return(
      <div className="appointment">
        {this.getStart()}-{this.getEnd()} <span onClick={this.deleteSelf} className="pseudobutton smallCircleButton" style={{backgroundColor:"red"}}>x</span>
      </div>
    )
  }
}

Appointment.propTypes = {
  name: PropTypes.string.isRequired,
  editAppointment: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  removeSelf: PropTypes.func.isRequired
}

export default Appointment;
