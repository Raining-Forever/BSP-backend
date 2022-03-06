const getDoctors = "select * from doctors";
const getDoctorById = "select * from doctors where id = $1";
const addDoctor =
  "insert into doctors (user_id, licenseNumber, email, title, firstname, lastname, birthday, tel, gender, address, province, district, subDistrict, postalCode) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";
const removeDoctor = "delete from doctors where id = $1";
const updateDoctor =
  "update doctors set user_id = $1, licenseNumber = $2, email = $3, title = $4, firstname = $5, lastname = $6, birthday = $7, tel = $8, gender = $9, address = $10, province = $11, district = $12, subDistrict = $13, postalCode = $14 where id = $15";

module.exports = {
  getDoctors,
  getDoctorById,
  addDoctor,
  removeDoctor,
  updateDoctor,
};
