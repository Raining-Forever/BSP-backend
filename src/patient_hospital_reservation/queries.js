const getPHRs = "select * from patient_hospital_reservation";
const getPHRById = "select * from patient_hospital_reservation where id = $1";
const addPHR =
  "insert into patient_hospital_reservation (patient_id, hospital_id, reservation_id, status) values ($1, $2, $3, $4) returning *";
const removePHR = "delete from patient_hospital_reservation where id = $1";
const updatePHR =
  "update patient_hospital_reservation set patient_id = $1, hospital_id = $2, reservation_id = $3, status = $4 where id = $5 returning *";

module.exports = {
  getPHRs,
  getPHRById,
  addPHR,
  removePHR,
  updatePHR,
};
