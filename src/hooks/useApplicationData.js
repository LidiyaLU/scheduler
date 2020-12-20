import {useState, useEffect} from "react";
import axios from 'axios';
import {getSpotsForDay} from "helpers/selectors";

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

//function which creates an appointment

  function bookInterview(id, interview) {
      
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state, appointments}
   
    const newSpot = getSpotsForDay(newState, state.day);
  
    const currentDay = state.days.find((day) => day.appointments.includes(id));

    const updatedDay = {
      ...currentDay, 
       spots: newSpot
    };

    const updatedDays = state.days.map((day) => {
      if(day.id === currentDay.id) {
        return updatedDay;
      } else {
        return day;
      }
    });
    

    return axios.put(`/api/appointments/${id}`,{interview})
    .then(response => {
      setState((prev) => ( {...prev,appointments, days: updatedDays}))
    })

  
  };

//function to cancel appointment
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state, appointments}
   
    const newSpot = getSpotsForDay(newState, state.day);
    console.log("deletedSpots", newSpot);

    const currentDay = state.days.find((day) => day.appointments.includes(id));

    const updatedDay = {
      ...currentDay, 
       spots: newSpot
    };

    const updatedDays = state.days.map((day) => {
      if(day.id === currentDay.id) {
        return updatedDay;
      } else {
        return day;
      }
    });
   
      return axios.delete(`/api/appointments/${id}`)
      .then(() => 
        setState((prev) => ({...prev, appointments, days: updatedDays})))
    
  };

  
   return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}