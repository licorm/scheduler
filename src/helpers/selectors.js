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
}