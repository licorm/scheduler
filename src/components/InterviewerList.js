import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';
import { PropTypes } from 'prop-types';

const InterviewList = function(props) {
  //map through the interviewers prop object to access correct information
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

//makes sure we receive interviewlist as an array
InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewList;