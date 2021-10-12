import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //declare the state using useReducer instead of useState
  const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {} });

  //reducer switch function
  function reducer(state, action) {
    
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        const days = updateSpots(state, appointments, action.id);
        
        return {
          ...state,
          appointments: appointments,
          days
        }
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  //set the day
  function setDay(day) {
    dispatch({ type: SET_DAY, day })
  };

  //update spots without mutating state
  function updateSpots(state, appointments, id) {
    const newDays = [];
    let newSpots = 0;

    for (const days of state.days) {
      if (days.appointments.includes(id)) {
        newSpots = 5 - days.appointments.length;
      }
      newDays.push({...days, spots: newSpots});
    }
    
    return newDays;

  }

  //booking an interview
  function bookInterview(id, interview) {

    // post the new data to the database
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
       


        return dispatch({ type: SET_INTERVIEW, id, interview});
       

      })

  };

  //delete the interview
  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`, { id })
      .then(() => {

        return dispatch({ type: SET_INTERVIEW, id, interview: null });
  
      })

  };

  //gets data from API database for loading the page
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

};