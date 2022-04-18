const pool = require("../../db");
const queries = require("./queries");

const getPHRs = async (req, res) => {
  const { patient_id, hospital_id, role } = req.body;

  if (role === "patient") {
    if (!patient_id) {
      res.json({ msg: "patient_id not found" });
    } else {
      const patientPHR = await pool.query(
        "select * from patient_hospital_reservation where patient_id = $1",
        [patient_id]
      );
      res.json(patientPHR.rows);
    }
  } else if (role === "hospital") {
    if (!hospital_id) {
      res.json({ msg: "hospital_id not found" });
    } else {
      const hospitalPHR = await pool.query(
        "select * from patient_hospital_reservation where hospital_id = $1",
        [hospital_id]
      );
      res.json(hospitalPHR.rows);
    }
  } else {
    pool.query(queries.getPHRs, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  }
};

const getPHRById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPHRById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPHR = async (req, res) => {
  const { patient_id, hospital_id, reservation_id } = req.body;

  const added = await pool.query(queries.addPHR, [
    patient_id,
    hospital_id,
    reservation_id,
  ]);
  res
    .status(201)
    .json({ msg: "PHR created successfully.", phr: added.rows[0] });
};

const updatePHR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { patient_id, hospital_id, reservation_id } = req.body;

  const checkPHR = await pool.query(queries.getPHRById, [id]);
  if (checkPHR.rowCount === 0) {
    res.json({ msg: "this phr_id not found" });
  } else {
    const updated = await pool.query(queries.updatePHR, [
      patient_id,
      hospital_id,
      reservation_id,
      id,
    ]);
    res
      .status(201)
      .json({ msg: "PHR updated successfully.", phr: updated.rows[0] });
  }
};

const removePHR = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getPHRById, [id], (error, results) => {
    const noPHRFound = !results.rows.length;
    if (noPHRFound) {
      res.json({ msg: "PHR does not exist" });
    } else {
      // remove process
      pool.query(queries.removePHR, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "PHR remove successfully." });
      });
    }
  });
};

module.exports = {
  getPHRs,
  getPHRById,
  addPHR,
  removePHR,
  updatePHR,
};
