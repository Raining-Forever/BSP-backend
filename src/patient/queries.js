const getPatients = "select * from patients";
const getPatientById = "select * from patients where id = $1";
const addPatient =
  "insert into patients (user_id,email,idcard,title,firstname,lastname,birthday,tel,weight,height,gender,is_covid_test,proof_type,is_detected,proof_url,address,province,district,subDistrict,postalCode) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)";
const removePatient = "delete from patients where id = $1";
const updatePatient =
  "update patients set user_id = $1, email = $2, idcard = $3, title = $4, firstname = $5, lastname = $6, birthday = $7, tel = $8, weight = $9, height = $10, gender = $11, is_covid_test = $12, proof_type = $13, is_detected = $14, proof_url = $15, address = $16, province = $17, district = $18, subDistrict = $19, postalCode = $20 where id = $21";

module.exports = {
  getPatients,
  getPatientById,
  addPatient,
  removePatient,
  updatePatient,
};
