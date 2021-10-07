//selector to grab appointments using state and day
export function getAppointmentsForDay(state, day) {
 
  if (state.days.length === 0) return [];
  //filter the days object to find the correct day
  const filteredDays = state.days.filter(days => days.name === day);
  //if nothing matches, there is nothing for that day
  if (filteredDays.length === 0) return [];
  //grab the appointments for the day
  const appointmentsForDay = filteredDays[0].appointments;
  const appointments = [];
  //map over appointments for the day and push into a new array 
  appointmentsForDay.map((appointment) => {
    appointments.push(state.appointments[appointment]);
  })
  return appointments;
};

//get the interview based on the interview and state
export function getInterview(state, interview) {
  if (interview === null) return null;
  const filteredInterviews = state.interviewers[interview.interviewer];

  const interviewData = {
    "student": interview.student,
    "interviewer": filteredInterviews
  };

  return interviewData;
};

//selector to grab interviews for day
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];
  const filteredDays = state.days.filter(days => days.name === day);
  if (filteredDays.length === 0) return [];
  const interviewersForDay = filteredDays[0].interviewers;
  const interviewers = [];
  interviewersForDay.map((interviewer) => {
    interviewers.push(state.interviewers[interviewer]);
  })
  return interviewers;
};