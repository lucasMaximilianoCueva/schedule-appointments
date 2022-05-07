export function deleteAppointment(id) { 
  fetch(`https://schedule-service-app.herokuapp.com/api/appointments/${id}`, { method: 'DELETE' })
}

export function addAppointment(title, start) {
  fetch('https://schedule-service-app.herokuapp.com/api/appointments', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    title,
    start
})
  })
}