import React, {Component} from 'react';
import Appointment from './Appointment.jsx';

let labels=['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12AM',"Start", "End"];

class AppointmentManager extends Component {
  constructor(props){
    super(props);

    this.state = {reservedHours: [], appointments: [], reserving:false, currStart:25, currEnd:26};

    this.selectStart = this.selectStart.bind(this);
    this.selectEnd = this.selectEnd.bind(this);
    this.swapReserving = this.swapReserving.bind(this);
    this.reserveAppointmentDirect = this.reserveAppointmentDirect.bind(this);
    this.reserveAppointment = this.reserveAppointment.bind(this);
    this.unreserveAppointment = this.unreserveAppointment.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
    this.editAppointment = this.editAppointment.bind(this);
    this.getSelector = this.getSelector.bind(this);
  }

  selectStart(e){
    this.setState({currStart: e.target.value});
  }

  selectEnd(e){
    this.setState({currEnd: e.target.value});
  }

  swapReserving(){
    this.setState({reserving: !this.state.reserving});
  }

  reserveAppointmentDirect(){
    let start=parseInt(this.state.currStart, 10);
    let end=parseInt(this.state.currEnd, 10);
    this.reserveAppointment(start,end);
  }

  isValidStartEndTimes(start,end){
    if(start===25 || start===26){
      alert("ERROR: Select a Start Time");
      return false;
    }
    if(end===25 || end===26){
      alert("ERROR: Select an End Time");
      return false;
    }
    if(end < start){
      alert("ERROR: End must be after Start");
      return false;
    }
    return true;
  }

  reserveAppointment(start, end){
    if(!this.isValidStartEndTimes(start,end)){
      return;
    }
    for(let i=start; i<=end; ++i){
      if(this.state.reservedHours.indexOf(i) !== -1){
        console.log(this.state.reservedHours);
        alert("ERROR: Appointments may not overlap: "+i);
        return;
      }
    }
    if(this.state.reservedHours.length > 0){
      alert("WARNING: There's another appointment scheduled for this day. Scheduling appointment, but watch it.");
    }
    let reserved=this.state.reservedHours.slice();
    for(let i=start; i<=end; ++i){
      reserved.push(i);
    }
    let apptString = labels[start] + "-" + labels[end];
    let apptValues = {start:start, end:end};

    let newAppointments = this.state.appointments;
    newAppointments[apptString]=apptValues;

    this.setState({appointments:newAppointments, reservedHours:reserved, currStart:25, currEnd:26});
  }

  unreserveAppointment(name, then=null){
    let start = this.state.appointments[name].start;
    let end = this.state.appointments[name].end;
    let reserved=this.state.reservedHours.slice();
    for(let i=parseInt(start, 10); i<=end; ++i){
      let idx = reserved.indexOf(i);
      if(idx !== -1){
        reserved.splice(idx, 1);
      }
    }
    let appointments = this.state.appointments;
    delete appointments[name];
    this.setState({reservedHours:reserved, appointments:appointments}, then);
  }

  getAppointments(){
    let appointments=[]
    for(let key in this.state.appointments){
      appointments.push(<Appointment
                key={this.state.appointments[key].start}
                name={key}
                editAppointment={this.editAppointment}
                start={this.state.appointments[key].start}
                end={this.state.appointments[key].end}
                removeSelf={this.unreserveAppointment}/>)
    }
    return appointments;
  }

  editAppointment(name, newStart, newEnd){
    if(!this.isValidStartEndTimes(parseInt(newStart,10), parseInt(newEnd,10))){
      return;
    }
    this.unreserveAppointment(name, this.reserveAppointment.bind(this, parseInt(newStart,10),parseInt(newEnd,10)));
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

  render(){
    return(
      <div className="cellInterior">
        {this.getAppointments()}
        {this.state.reserving ? <div className="reservingContainer">
          {this.getSelector(this.selectStart, this.state.currStart)}
          {this.getSelector(this.selectEnd, this.state.currEnd)}
          <span onClick={this.reserveAppointmentDirect} className="pseudobutton">
            Reserve
          </span>
        </div> : null}
        <span onClick={this.swapReserving} className="pseudobutton circleButton">
          {this.state.reserving ? "x" : "+"}
        </span>
      </div>
    );
  }
}

export default AppointmentManager;
