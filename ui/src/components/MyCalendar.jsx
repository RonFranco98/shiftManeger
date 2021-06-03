import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function getSunday(d) {
  d = new Date(d);
  let day = d.getDay(),
      diff = d.getDate() - day;
  let sunday = new Date(d.setDate(diff))
  return sunday.toLocaleDateString().replaceAll("/" , "-");
}

function MyCalendar(props) {
  const [date, setDate] = useState(new Date());
  onchange = async (date) =>{
    await props.commitRistrictionChanges()
    setDate(date)
    let firstDay = getSunday(date)
    props.retriveDate(firstDay)
    let raw = await fetch( `http://localhost:8000/getRestrictions/?user=${props.userName}&week=${firstDay}`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    let restrictions = await raw.json()
    props.retriveRestrictions(restrictions)
  }
  useEffect(async () => {
    await onchange(new Date())
  } , [])
  return (
    <center className="calenderContainer">
      <Calendar
        onChange={onchange}
        value={date}
        calendarType={"Hebrew"}
      />
    </center>
  );
}
export default MyCalendar;