import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {


const interviewer = classNames("interviewers__item", {
  "interviewers__item--selected":props.selected === true
});

return (
  <li className={interviewer}
  onClick = {() => props.setInterviewer(props.id)}
  >
    <img
    className="interviewers__item-image" 
    src={props.avatar}
    alt={props.name}
    
  />

    {props.name}
    
</li>
  );
}