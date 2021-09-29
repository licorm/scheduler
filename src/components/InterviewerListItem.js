import React from 'react';
import "components/InterviewerListItem.scss";
const classnames = require('classnames');

export default function InterviewListItem(props) {
  
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  const imgClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })

  return (
  <li className={interviewerClass} id={props.id} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={imgClass}
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>
  )
}