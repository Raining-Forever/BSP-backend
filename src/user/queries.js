const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addUser =
  "INSERT INTO users (email, is_admin) VALUES ($1, $2) returning id, email";
const checkEmailExists = "SELECT * FROM users u WHERE u.email = $1";
const removeUser = "DELETE FROM users CASCADE WHERE id = $1";
const updateUser = "UPDATE users SET email = $1, is_admin = $2 WHERE id = $3";
const getUserByEmail = "select email from users u where u.email = $1";

module.exports = {
  getUsers,
  getUserById,
  addUser,
  checkEmailExists,
  removeUser,
  updateUser,
  getUserByEmail,
};
