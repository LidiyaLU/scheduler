import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import axios from "axios";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("daylyApps", dailyAppointments);
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
          cancelInterview={cancelInterview}         
               
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