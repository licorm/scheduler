import React from 'react';
import "components/InterviewerListItem.scss";
const classnames = require('classnames');

export default function InterviewListItem(props) {
  //setting classnames to different states
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  return (
    <li className={interviewerClass} id={props.id} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}