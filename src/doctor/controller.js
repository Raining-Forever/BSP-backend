const { user } = require("pg/lib/defaults");
const pool = require("../../db");
const queries = require("./queries");

const getDoctors = async (req, res) => {
  await pool.query(queries.getDoctors, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getDoctorById = async (req, res) => {
  const id = parseInt(req.params.id);
  await pool.query(queries.getDoctorById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addDoctor = async (req, res) => {
  const {
    user_id,
    licenseNumber,
    email,
    title,
    firstname,
    lastname,
    birthday,
    tel,
    gender,
    address,
    province,
    district,
    subdistrict,
    postalcode,
  } = req.body;

  // check user from user_id

  if (!user_id) {
    res.json({ msg: "user_id not found" });
  } else {
    const checkUserExist = await pool.query(
      "select * from users where id = $1",
      [user_id]
    );
    if (checkUserExist.rowCount === 0) {
      res.json({ msg: "user not found" });
    } else {
      const checkDoctorExist = await pool.query(
        "select * from doctors where user_id = $1",
        [user_id]
      );
      if (checkDoctorExist.rowCount > 0) {
        res.json({ msg: "Doctor from this user_id already exist" });
      } else {
        const addedDoctor = await pool.query(queries.addDoctor, [
          user_id,
          licenseNumber,
          email,
          title,
          firstname,
          lastname,
          birthday,
          tel,
          gender,
          address,
          province,
          district,
          subdistrict,
          postalcode,
        ]);
        res.status(201).json({
          msg: "Doctor created successfully.",
          loggedIn: true,
          role: "doctor",
          user_info: addedDoctor.rows[0],
        });
      }
    }
  }
};

const removeDoctor = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getDoctorById, [id], (error, results) => {
    const noDoctorFound = !results.rows.length;
    if (noDoctorFound) {
      res.json({ msg: "Doctor does not exist" });
    } else {
      // remove process
      pool.query(queries.removeDoctor, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Doctor remove successfully." });
      });
    }
  });
};

const updateDoctor = async (req, res) => {
  const id = parseInt(req.params.id);

  const {
    user_id,
    licenseNumber,
    email,
    title,
    firstname,
    lastname,
    birthday,
    tel,
    gender,
    address,
    province,
    district,
    subdistrict,
    postalcode,
  } = req.body;

  if (!user_id) {
    res.json({ msg: "user_id not found" });
  }
  //check Doctor id exist for update or not
  else
    pool.query(queries.getDoctorById, [id], (error, results) => {
      const noDoctorFound = !results.rows.length;
      if (noDoctorFound) {
        res.json({ msg: "Doctor does not exist" });
      } else {
        pool.query(
          queries.updateDoctor,
          [
            user_id,
            licenseNumber,
            email,
            title,
            firstname,
            lastname,
            birthday,
            tel,
            gender,
            address,
            province,
            district,
            subdistrict,
            postalcode,
            id,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(200).json({
              msg: "Doctor updated successfully.",
              loggedIn: true,
              role: "doctor",
              user_info: results.rows[0],
            });
          }
        );
      }
    });
};

module.exports = {
  getDoctors,
  getDoctorById,
  addDoctor,
  removeDoctor,
  updateDoctor,
};
