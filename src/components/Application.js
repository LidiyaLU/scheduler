import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import axios from "axios";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days:[],
    interviewers: {},
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {      
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    })  
  }, []);

  //console.log('Days', state.days);

  function bookInterview(id, interview) {
    
    //const newInterview = {...state.appointments.id, interview:null} // create new interview
    //console.log(id, interview);

    // update new interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`,{interview})
    .then(response => setState((prev) =>( {...prev, appointments})) )
  };

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsAll = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

      return (
        <Appointment
          {...appointment}  
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}         
               
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