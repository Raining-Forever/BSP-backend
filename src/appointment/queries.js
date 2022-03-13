const getAppointments = "select * from appointments";
const getAppointmentById = "select * from appointments where id = $1";
const addAppointment =
  "insert into appointments (startTime, endTime, url, status) values ($1, $2, $3, $4)";
const removeAppointment = "delete from appointments where id = $1";
const updateAppointment =
  "update appointments set startTime = $1, endTime = $2, url = $3, status = $4 where id = $5";

module.exports = {
  getAppointments,
  getAppointmentById,
  addAppointment,
  removeAppointment,
  updateAppointment,
};
