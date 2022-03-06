const pool = require("../../db");
const queries = require("./queries");

const getHospitals = (req, res) => {
  pool.query(queries.getHospitals, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHospitalById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getHospitalById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addHospital = (req, res) => {
  const {
    user_id,
    hospital_name,
    hospital_number,
    bed_total,
    bed_occupied,
    tel,
    address,
    province,
    district,
    subdistrict,
    postalCode,
  } = req.body;

  pool.query(
    queries.addHospital,
    [
      user_id,
      hospital_name,
      hospital_number,
      bed_total,
      bed_occupied,
      tel,
      address,
      province,
      district,
      subdistrict,
      postalCode,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Hospital created successfully.");
    }
  );
};

const removeHospital = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getHospitalById, [id], (error, results) => {
    const noHospitalFound = !results.rows.length;
    if (noHospitalFound) {
      res.send("Hospital does not exist");
    } else {
      // remove process
      pool.query(queries.removeHospital, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Hospital remove successfully.");
      });
    }
  });
};

const updateHospital = (req, res) => {
  const id = parseInt(req.params.id);

  const {
    user_id,
    hospital_name,
    hospital_number,
    bed_total,
    bed_occupied,
    tel,
    address,
    province,
    district,
    subdistrict,
    postalCode,
  } = req.body;

  //check Hospital id exist for update or not
  pool.query(queries.getHospitalById, [id], (error, results) => {
    const noHospitalFound = !results.rows.length;
    if (noHospitalFound) {
      res.send("Hospital does not exist");
    } else {
      pool.query(
        queries.updateHospital,
        [
          user_id,
          hospital_name,
          hospital_number,
          bed_total,
          bed_occupied,
          tel,
          address,
          province,
          district,
          subdistrict,
          postalCode,
          id,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Hospital updated successfully.");
        }
      );
    }
  });
};

module.exports = {
  getHospitals,
  getHospitalById,
  addHospital,
  removeHospital,
  updateHospital,
};
