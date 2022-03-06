const pool = require("../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const { email, is_admin } = req.body;

  // check email exists

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
    }
    // add user
    else
      pool.query(queries.addUser, [email, is_admin], (error, results) => {
        if (error) throw error;
        res.status(201).send("User created successfully.");
      });
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  // check that user exist or not
  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    // user not exist
    if (noUserFound) {
      res.send("User does not exist.");
    }
    // user exist > ready to delete
    else
      pool.query(queries.removeUser, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("User remove successfully.");
      });
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { email, is_admin } = req.body;

  // check that user exist or not
  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    // user not exist
    if (noUserFound) {
      res.send("User does not exist.");
    } else
      pool.query(
        queries.updateUser,
        [email, is_admin, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("User updated successfully.");
        }
      );
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
