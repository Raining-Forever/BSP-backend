const pool = require("../../db");
const queries = require("./queries");

const getDoctors = (req, res) => {
  pool.query(queries.getDoctors, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getDoctorById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getDoctorById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addDoctor = (req, res) => {
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
    subDistrict,
    postalCode,
  } = req.body;

  pool.query(
    queries.addDoctor,
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
      subDistrict,
      postalCode,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ msg: "Doctor created successfully." });
    }
  );
};

const removeDoctor = (req, res) => {
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

const updateDoctor = (req, res) => {
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
    subDistrict,
    postalCode,
  } = req.body;

  //check Doctor id exist for update or not
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
          subDistrict,
          postalCode,
          id,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(200).json({ msg: "Doctor updated successfully." });
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
