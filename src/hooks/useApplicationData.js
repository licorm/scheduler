import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  function setDay(day) {
    setState({
      ...state,
      day
    })
  };

  //booking an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointment, appointments)

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments
        });

      });
  
  };

  //delete the interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(appointments)
    return axios.delete(`/api/appointments/${id}`, { id })
    .then(() => {
      setState({
        ...state,
        appointments
      });
      console.log(state)
    })

  };

  useEffect(() => {
    Promise.all([
     axios.get("/api/days"),
     axios.get("/api/appointments"),
     axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });  
  }, []);
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

};