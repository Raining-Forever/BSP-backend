const getAppointments = "select * from appointments";
const getAppointmentById = "select * from appointments where id = $1";
const addAppointment =
  "insert into appointments (starttime, endtime, url, status) values ($1, $2, $3, $4) returning *";
const removeAppointment = "delete from appointments where id = $1";
const updateAppointment =
  "update appointments set starttime = $1, endtime = $2, url = $3, status = $4 where id = $5 returning *";

module.exports = {
  getAppointments,
  getAppointmentById,
  addAppointment,
  removeAppointment,
  updateAppointment,
};
