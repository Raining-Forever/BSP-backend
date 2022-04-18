const pool = require("../../db");
const queries = require("./queries");

const getPDAs = async (req, res) => {
  const { patient_id, doctor_id, role } = req.body;

  if (role === "patient") {
    if (!patient_id) {
      res.json({ msg: "patient_id not found" });
    } else {
      const patientPDA = await pool.query(
        "select * from patient_doctor_appointment where patient_id = $1",
        [patient_id]
      );
      res.json(patientPDA.rows);
    }
  } else if (role === "doctor") {
    if (!doctor_id) {
      res.json({ msg: "doctor_id not found" });
    } else {
      const doctorPDA = await pool.query(
        "select * from patient_doctor_appointment where doctor_id = $1",
        [doctor_id]
      );
      res.json(doctorPDA.rows);
    }
  } else
    pool.query(queries.getPDAs, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
};

const getPDAById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPDAById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPDA = async (req, res) => {
  const { patient_id, doctor_id, appointment_id } = req.body;

  const added = await pool.query(queries.addPDA, [
    patient_id,
    doctor_id,
    appointment_id,
  ]);
  res
    .status(201)
    .json({ msg: "PDA created successfully.", pda: added.rows[0] });
};

const updatePDA = async (req, res) => {
  const id = parseInt(req.params.id);
  const { patient_id, doctor_id, appointment_id } = req.body;

  const checkPDA = await pool.query(queries.getPDAById, [id]);
  if (checkPDA.rowCount === 0) {
    res.json({ msg: "this pda_id not found" });
  } else {
    const updated = await pool.query(queries.updatePDA, [
      patient_id,
      doctor_id,
      appointment_id,
      id,
    ]);
    res.json({ msg: "pda updated successfully", pda: updated.rows[0] });
  }
};

const removePDA = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getPDAById, [id], (error, results) => {
    const noPDAFound = !results.rows.length;
    if (noPDAFound) {
      res.json({ msg: "PDA does not exist" });
    } else {
      // remove process
      pool.query(queries.removePDA, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "PDA remove successfully." });
      });
    }
  });
};

module.exports = {
  getPDAs,
  getPDAById,
  addPDA,
  removePDA,
  updatePDA,
};
