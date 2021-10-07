import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  
  const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {}});
  console.log("state", state)
 
  function reducer(state, action) {
    console.log("action", action)
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
        return {
          ...state, 
          appointments: appointments,
          days: action.days
        }
      }
        
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


  function setDay(day) {
    dispatch({ type: SET_DAY, day })
  };

  //booking an interview
  function bookInterview(id, interview) {
    
    //return new Promise((resolve, reject) => {
      return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
      
        return axios.get(`/api/days`)
        .then((response) => {
          const days = response.data
          dispatch({ type: SET_INTERVIEW, id, interview, days: days });

        })
        
      })
   
  };

  //delete the interview
  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`, { id })
    .then(() => {
      return axios.get(`/api/days`)
      .then(({data}) => {
        
        return dispatch({ type: SET_INTERVIEW, id, interview: null, days: data });
       
      })
      
    })

  };

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