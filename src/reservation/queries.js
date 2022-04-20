const getReservations = "select * from reservation";
const getReservationById = "select * from reservation where id = $1";
const addReservation =
  "insert into reservation (status, checkIn, checkOut, patient_id, hospital_id) values ($1, $2, $3, $4, $5) returning *";
const removeReservation = "delete from reservation where id = $1";
const updateReservation =
  "update reservation set status = $1, checkIn = $2, checkOut = $3, patient_id = $4, hospital_id = $5 where id = $6 returning *";

module.exports = {
  getReservations,
  getReservationById,
  addReservation,
  removeReservation,
  updateReservation,
};
