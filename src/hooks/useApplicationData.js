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


  

  function updateSpots(state) {
    for (const day of state.days) {
      console.log("the day", day)
      if (day.name === state.day) {
        console.log("it me", day.appointments)
        
      }
    }
  }

  //booking an interview
  function bookInterview(id, interview) {
    console.log("before book", state.appointments[id])
    console.log(interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("this is the appointments to set state", appointments)
    console.log("this is the  state", state)
    //return new Promise((resolve, reject) => {
      return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
      //  setState({
      //     ...state,
      //     appointments
      //   });

        return axios.get(`/api/days`)
        .then((response) => {
          const days = response.data
          return setState({
            ...state,
            appointments, 
            days
          })

        })
        
      })
   // })
    // return axios.put(`/api/appointments/${id}`, { interview })
    //   .then((response) => {
    //   //  setState({
    //   //     ...state,
    //   //     appointments
    //   //   });

    //     axios.get(`/api/days`)
    //     .then((response) => {
    //       const days = response.data
    //       setState({
    //         ...state,
    //         appointments, 
    //         days
    //       })
    //     })
        
    //   })
      //.then(() => {
        // axios.get(`/api/days`)
        // .then((response) => {

        // })
        // let newAppointments = [];
        // let spots = '';
        // let newDay = '';
        // console.log(state, "im the state")
        // for (const day of state.days) {
        //   if (day.name === state.day) {
            
        //     console.log("it me", day.spots)
        //     newAppointments = [...day.appointments]
        //     console.log("new appointments", newAppointments)
        //     spots = 5 - newAppointments.length;
            
        //     newDay = day
            
        //   }
        // }
        // const day = state.days.indexOf(newDay)
        // console.log("new day", newDay)
        // const dayState = {
        //   ...state.days[day]
        // }
        
        // dayState.spots = spots;
        // console.log("day spots?", dayState.spots)
        // console.log("day", day)
        // console.log("day state", dayState)
        // const updatedDaysArray = state.days.slice(1)
        // console.log("updated days", updatedDaysArray)
        // const days = [dayState, ...updatedDaysArray];
        // console.log("final days state", days)
        // const newState = {
        //   ...state,
        //   days
        // }
        // ///setState(newState)
        // console.log(newState, "new state")
        // return newState
      // })
      // .then((newState) => {
      //   setState(newState)
      // })
  
  };

  //delete the interview
  function cancelInterview(id) {
    

    console.log("before delete", state)
    
    return axios.delete(`/api/appointments/${id}`, { id })
    .then(() => {
      return axios.get(`/api/days`)
      .then(({data}) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        
        return setState({
          ...state,
          appointments,
          days: data
        });
        console.log("after delete", state)
      })
      
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