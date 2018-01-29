import React, { Component } from 'react';
import './App.css';
import CalendarApp from './components/CalendarApp.jsx';

class App extends Component {
  constructor(props){
    super(props);
    let currDate = new Date();
    let currYear = currDate.getYear();
    let isLeapYear = false;

    if(currYear % 4 === 0){
      if(currYear % 100 === 0){
        if(currYear % 400 === 0){
          // Divisible by 400: IS leap year
          isLeapYear = true;
        } else {
          // Divisible by 100 but not 400: NOT leap year
          isLeapYear = false;
        }
      } else {
        // Divisible by 4 but not 100: IS leap year
        isLeapYear = true
      }
    } // Else: NOT leap year

    this.state = {date:currDate, isLeapYear: isLeapYear};

  }
  render() {
    return (
      <div>
        <CalendarApp date={this.state.date} isLeapYear={this.state.isLeapYear}/>
      </div>
    );
  }
}

export default App;
