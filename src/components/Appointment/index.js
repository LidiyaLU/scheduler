import React , { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {



  const { mode, transition, back } = useVisualMode(

    props.interview ? SHOW : EMPTY

    //.then(response => transition(SHOW))
  );

  function save(name, interviewer) {
    // why we should call bookInterview here?
    const interview = {
      student: name,
      interviewer
    };
    console.log("safe function called!");
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(responce => transition(SHOW));
  };


  function deletionAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  };

  function confirmDeletion() {
    transition(CONFIRM);
  }

  return (
    
      <article className="appointment">
        <Header time={props.time}/>
          {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
          {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeletion}
        /> 
          )}  
          {mode === CREATE && (<Form interviewers = {props.interviewers}
            onSave={save}
            onCancel={back}
          />)}
          {mode === SAVING && (
            <Status messsage = {"Saved"} />
          )}
          {mode === CONFIRM && (
            <Confirm message = {"R U SURE?"}
            onCancel={back}
            onConfirm={deletionAppointment}
            />
          )}
          {mode === DELETING && (
            <Status message = {"Deleted"}
            />
          )}
      
      </article>
  )
}