import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
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

  // const setDay = day => setState({ ...state, state.day });

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

  console.log('Days', state.days);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  


  const appointmentsAll = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={state.interviewers}
          
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
                setDay={setState}
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