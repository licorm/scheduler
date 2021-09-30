import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "../../components/InterviewerList";

export default function Form(props) {
  //setting states
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  //function to reset the states
  const reset = () => { return setName(""), setInterviewer(null) }
  //function to send to cancel button which calls the props and reset functions
  const cancel = () => {
    return (props.onCancel(), reset())
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter your name here"

          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave(studentName, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
};