//selector to grab appointments using state and day
export function getInformationForDay(state, day, dataNeeded) {
 
  if (state.days.length === 0) return [];
  //filter the days object to find the correct day
  const filteredDays = state.days.find(days => days.name === day);
  //if nothing matches, there is nothing for that day
  if (filteredDays.length === 0) return [];
  //grab the appointments for the day
  const dataForDay = filteredDays[dataNeeded];
  const dataArray = [];
  //iterate over appointments for the day and push into a new array 
  dataForDay.forEach((data) => {
    dataArray.push(state[dataNeeded][data]);
  })
  return dataArray;
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

