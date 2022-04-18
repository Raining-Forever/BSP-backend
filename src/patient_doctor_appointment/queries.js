const getPDAs = "select * from patient_doctor_appointment";
const getPDAById = "select * from patient_doctor_appointment where id = $1";
const addPDA =
  "insert into patient_doctor_appointment (patient_id, doctor_id, appointment_id) values ($1, $2, $3) returning *";
const removePDA = "delete from patient_doctor_appointment where id = $1";
const updatePDA =
  "update patient_doctor_appointment set patient_id = $1, doctor_id = $2, appointment_id = $3 where id = $4 returning *";

module.exports = {
  getPDAs,
  getPDAById,
  addPDA,
  removePDA,
  updatePDA,
};
