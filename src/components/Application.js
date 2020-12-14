import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";


const urls = {
  days: 'http://localhost:8001/api/days'
}

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days:[],
    interviewers: {},
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("here" , dailyAppointments);
  const setDay = day => setState({ ...state, day });

  //const setDays = (days) => setState(prev => ({...prev, days}));



  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      
      setState(prev => ({
        ...prev, 
        days:all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    })  
  }, []);


  const appointmentsAll = dailyAppointments.map(appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}       
        />
      );
      })
  
  return (
   
    <main className="layout">
      <section className="sidebar">
        {
           <React.Fragment>
             <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
              <hr className="sidebar__separator sidebar--centered" />
              <nav className="sidebar__menu">
              <DayList
               
                days={state.days}
                day={state.day}
                setDay={setDay}
              />
              </nav>
                <img
                className="sidebar__lhl sidebar--centered"
                src="images/lhl.png"
                alt="Lighthouse Labs"/>
</React.Fragment>}
      </section>
      <section className="schedule">
        {appointmentsAll}
      </section>
    </main>
  );
}