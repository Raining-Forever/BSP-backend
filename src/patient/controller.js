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

const addPatient = async (req, res) => {
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

  // check user already exist
  const checkEmailExists = await pool.query(
    "select email from patients where email = $1",
    [email]
  );
  if (checkEmailExists.rowCount > 0) {
    res.json({
      msg: "Email already registered",
    });
  } else
    await pool.query(
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
        console.log(results.rows);
        res.status(201).json({
          loggedIn: true,
          email,
          role: "patient",
          user_id: results.user_id,
          user_info: results.rows,
        });
      }
    );
};

const removePatient = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  await pool.query(queries.getPatientById, [id], (error, results) => {
    const noPatientFound = !results.rows.length;
    if (noPatientFound) {
      res.json({ msg: "Patient does not exist" });
    } else {
      // remove process
      pool.query(queries.removePatient, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Patient remove successfully." });
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
      res.json({ msg: "Patient does not exist" });
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
          res.status(200).json({ msg: "Patient updated successfully." });
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
