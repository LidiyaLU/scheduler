import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const mappedDayList = props.days.map(item => 
    <DayListItem name={item.name} 
    key = {item.id}
    id = {item.id}
    spots={item.spots} 
    selected={item.name === props.day}
    setDay={props.setDay}/>)

  return(
    <ul>
    {mappedDayList}
    </ul>
  )
}