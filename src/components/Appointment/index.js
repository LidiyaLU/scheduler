import React , { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {



  const { mode, transition, back } = useVisualMode(

    props.interview ? SHOW : EMPTY

  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer

    };
   
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));

  };


  function deletionAppointment() {

    transition(DELETING);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
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
          onEdit={() => transition(EDIT)}
        /> 
          )}  
          {mode === CREATE && (<Form interviewers = {props.interviewers}
            onSave={save}
            onCancel={back}
          />)}
          {mode === SAVING && (
            <Status message = {"Saved"} />
          )}
          {mode === CONFIRM && (
            <Confirm 
            onCancel={back}
            onConfirm={deletionAppointment}
            />
          )}
          {mode === DELETING && (
            <Status message = {"Deleted"}
            />
          )}
          {mode === EDIT && (
            <Form name={props.interview.student}
              interviewer={props.interview.interviewer.id}
              interviewers={props.interviewers}
              onSave={save}
              onCancel={() => transition(SHOW)}
              />
            
          )}

          {mode === ERROR_DELETE && (
            <Error message = {"Error on deleting"} 
              onClose = {back}/>
          )}
          {mode === ERROR_SAVE && (
          <Error message = {"Error on Saving"} 
              onClose = {back}/>
          )}
      
      </article>
  )
}