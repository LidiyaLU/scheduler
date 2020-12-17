import React, { useState , useEffect} from "react";
import axios from 'axios';

export default function  useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect( () => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
      
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}));

    });
  },[]);


  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) =>  {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`,{interview},)
    .then(response => {
      setState((prev) => ( {...prev,appointments}))
    })

  };

  const cancelInterview = (id) => {

   
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      id: appointment
    };
   
      return axios.delete(`/api/appointments/${id}`)
      .then(response => setState((prev) =>( {...prev, appointments})) )
   
    

  };
  // Get data from API and set the sate with the retrieved data
 


   //setting the day when user clicks 
  
   return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}