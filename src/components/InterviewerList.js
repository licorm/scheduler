import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

export default function InterviewList(props) {
  const interviewers = props.interviewers.map((obj) => {
    return (
      <InterviewerListItem
      key={obj.id}
      name={obj.name}
      avatar={obj.avatar}
      selected={obj.id === props.value}
      setInterviewer={event => props.onChange(obj.id)}
      />
      )
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}