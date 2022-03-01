const getUsers = "SELECT * FROM user_info";
const getUserById = "SELECT * FROM user_info WHERE id = $1";
const addUser =
  "INSERT INTO user_info (idcard, title, firstname, lastname, birthday, tel, email, weight, height, gender, isCovidTest, proofType, isDetected, proofUrl, address, province, district, subDistrict, postalCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";
const checkEmailExists = "SELECT * FROM user_info WHERE email = $1";
const removeUser = "DELETE FROM user_info WHERE id = $1";
const updateUser =
  "UPDATE user_info SET idcard = $1, title = $2, firstname = $3, lastname = $4, birthday = $5, tel = $6, email = $7, weight = $8, height = $9, gender = $10, isCovidTest = $11, proofType = $12, isDetected = $13, proofUrl = $14, address = $15, province = $16, district = $17, subDistrict = $18, postalCode = $19 WHERE id = $20";

module.exports = {
  getUsers,
  getUserById,
  addUser,
  checkEmailExists,
  removeUser,
  updateUser,
};
