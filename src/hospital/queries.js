const getHospitals = "select * from hospitals";
const getHospitalById = "select * from hospitals where id = $1";
const addHospital =
  "insert into hospitals (user_id, hospital_name, hospital_number, bed_total, bed_occupied, tel, address, province, district, subdistrict, postalCode) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *";
const removeHospital = "delete from hospitals where id = $1";
const updateHospital =
  "update hospitals set user_id = $1, hospital_name = $2, hospital_number = $3, bed_total = $4, bed_occupied = $5, tel = $6, address = $7, province = $8, district = $9, subdistrict = $10, postalCode = $11 where id = $12 returning *";

module.exports = {
  getHospitals,
  getHospitalById,
  addHospital,
  removeHospital,
  updateHospital,
};
