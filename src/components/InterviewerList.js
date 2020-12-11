import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {

const mappedInterviewerList = props.interviewers.map(item => 
  <InterviewerListItem 
  id = {item.id}
  name = {item.name}
  avatar = {item.avatar}
  setInterviewer = {props.setInterviewer}
  selected = {props.setInterviewer && props.setInterviewer(props.id)}
  />
  
);

return (
<ul>  
{mappedInterviewerList}
</ul>
);

}