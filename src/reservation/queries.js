const getReservations = "select * from reservation";
const getReservationById = "select * from reservation where id = $1";
const addReservation =
  "insert into reservation (status, checkIn, checkOut) values ($1, $2, $3) returning *";
const removeReservation = "delete from reservation where id = $1";
const updateReservation =
  "update reservation set status = $1, checkIn = $2, checkOut = $3 where id = $4 returning *";

module.exports = {
  getReservations,
  getReservationById,
  addReservation,
  removeReservation,
  updateReservation,
};
