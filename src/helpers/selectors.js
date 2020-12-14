import React from "react";

export function getAppointmentsForDay(state, day) {
  
  const selectedDay = state.days.find(currentDay => currentDay.name === day);

  if(!selectedDay){
    return [];
  }
  return selectedDay.appointments.map(appointmentId=> state.appointments[appointmentId]);

}