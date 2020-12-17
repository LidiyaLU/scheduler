import React from "react";

export function getAppointmentsForDay(state, day) {

  console.log("state", state);

  const selectedDay = state.days.find((currentDay) => currentDay.name === day);

  if(!selectedDay){
    return [];
  }
  return selectedDay.appointments.map(appointmentId => state.appointments[appointmentId])

};

export function getInterviewersForDay(state, day) {

  const selectedDay = state.days.find((currentDay) => currentDay.name === day);

  if(!selectedDay){
    return [];
  }
  return selectedDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);

};

export function getInterview(state,interview) {

  let selectedInterview = {};

  if (!interview) {
    return null;
  }

  for (let intr in state.interviewers) {
    if (state.interviewers[intr].id === interview.interviewer) {
      selectedInterview = {
        student: interview.student,
        interviewer: state.interviewers[intr]
      }
    }
  }
  return selectedInterview;
};

export function getSpotsForDay(state, dayName) {

  const selectedDay = state.days.find((currentDay) => currentDay.name === dayName);

return selectedDay.appointments.filter(appointmentId => state.appointments[appointmentId].interview === null).length;
}