const pool = require("../../db");
const queries = require("./queries");

const getHospitals = async (req, res) => {
  pool.query(queries.getHospitals, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHospitalById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getHospitalById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addHospital = async (req, res) => {
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
    postalcode,
  } = req.body;

  if (!user_id) {
    res.json({ msg: "user_id not found" });
  } else {
    const checkHospitalExist = await pool.query(
      "select * from hospitals where user_id = $1",
      [user_id]
    );
    if (checkHospitalExist.rowCount > 0) {
      res.json({ msg: "hospital from this user_id already exist" });
    } else {
      const addedHospital = await pool.query(queries.addHospital, [
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
        postalcode,
      ]);
      res.status(201).json({
        msg: "Hospital created successfully.",
        loggedIn: true,
        role: "hospital",
        user_info: addedHospital.rows[0],
      });
    }
  }
};

const removeHospital = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getHospitalById, [id], (error, results) => {
    const noHospitalFound = !results.rows.length;
    if (noHospitalFound) {
      res.json({ msg: "Hospital does not exist" });
    } else {
      // remove process
      pool.query(queries.removeHospital, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Hospital remove successfully." });
      });
    }
  });
};

const updateHospital = async (req, res) => {
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
    postalcode,
  } = req.body;

  if (!user_id) {
    res.json({ msg: "user_id not found" });
  } else {
    const checkHospital = await pool.query(
      "select * from hospitals where id = $1 and user_id = $2",
      [id, user_id]
    );
    if (checkHospital.rowCount === 0) {
      res.json({ msg: "hospital from this id and user_id not found" });
    } else {
      const updatedHospital = await pool.query(queries.updateHospital, [
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
        postalcode,
        id,
      ]);
      res.status(201).json({
        msg: "Hospital updated successfully.",
        loggedIn: true,
        role: "hospital",
        user_info: updatedHospital.rows[0],
      });
    }
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  addHospital,
  removeHospital,
  updateHospital,
};
