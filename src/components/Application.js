import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";

 const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ivanov Ivan",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Farida Asfx",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "6pm",
  }
];


const urls = {
  days: 'http://localhost:8001/api/days'
}

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    //appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => setState(prev => ({...prev, days}));

  useEffect(() => {
    axios.get(urls.days).then(response => {
      setDays(response.data);
    }, []);
  })

  const appointmentsAll = appointments.map(appointment => {
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