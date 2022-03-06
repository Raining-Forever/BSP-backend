const pool = require("../../db");
const queries = require("./queries");

const getPatients = (req, res) => {
  pool.query(queries.getPatients, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPatientById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPatientById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPatient = (req, res) => {
  const {
    user_id,
    email,
    idcard,
    title,
    firstname, //5
    lastname,
    birthday,
    tel,
    weight,
    height, //10
    gender,
    is_covid_test,
    proof_type,
    is_detected,
    proof_url, //15
    address,
    province,
    district,
    subDistrict,
    postalCode, //20
  } = req.body;
  pool.query(
    queries.addPatient,
    [
      user_id,
      email,
      idcard,
      title,
      firstname,
      lastname,
      birthday,
      tel,
      weight,
      height,
      gender,
      is_covid_test,
      proof_type,
      is_detected,
      proof_url,
      address,
      province,
      district,
      subDistrict,
      postalCode,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Patient created successfully.");
    }
  );
};

const removePatient = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getPatientById, [id], (error, results) => {
    const noPatientFound = !results.rows.length;
    if (noPatientFound) {
      res.send("Patient does not exist");
    } else {
      // remove process
      pool.query(queries.removePatient, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Patient remove successfully.");
      });
    }
  });
};

const updatePatient = (req, res) => {
  const id = parseInt(req.params.id);

  const {
    user_id,
    email,
    idcard,
    title,
    firstname, //5
    lastname,
    birthday,
    tel,
    weight,
    height, //10
    gender,
    is_covid_test,
    proof_type,
    is_detected,
    proof_url, //15
    address,
    province,
    district,
    subDistrict,
    postalCode, //20
  } = req.body;

  //check patient id exist for update or not
  pool.query(queries.getPatientById, [id], (error, results) => {
    const noPatientFound = !results.rows.length;
    if (noPatientFound) {
      res.send("Patient does not exist");
    } else {
      pool.query(
        queries.updatePatient,
        [
          user_id,
          email,
          idcard,
          title,
          firstname, //5
          lastname,
          birthday,
          tel,
          weight,
          height, //10
          gender,
          is_covid_test,
          proof_type,
          is_detected,
          proof_url, //15
          address,
          province,
          district,
          subDistrict,
          postalCode,
          id,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Patient updated successfully.");
        }
      );
    }
  });
};

module.exports = {
  getPatients,
  getPatientById,
  addPatient,
  removePatient,
  updatePatient,
};
