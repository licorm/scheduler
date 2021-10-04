export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  const filteredDays = state.days.filter(days => days.name === day);
  if (filteredDays.length === 0) return [];
  const appointmentsForDay = filteredDays[0].appointments;
  const appointments = [];
  appointmentsForDay.map((appointment) => {
    appointments.push(state.appointments[appointment]);
  })
  return appointments;
};

export function getInterview(state, interview) {
  if (interview === null) return null;
  const filteredInterviews = state.interviewers[interview.interviewer];
  
  const interviewData = {
    "student": interview.student,
    "interviewer" : filteredInterviews
  };
 
  return interviewData;
};

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
}