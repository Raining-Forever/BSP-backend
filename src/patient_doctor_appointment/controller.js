const pool = require("../../db");
const queries = require("./queries");

const getPDAs = (req, res) => {
  pool.query(queries.getPDAs, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPDAById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPDAById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPDA = (req, res) => {
  const { patient_id, doctor_id, appointment_id } = req.body;

  pool.query(
    queries.addPDA,
    [patient_id, doctor_id, appointment_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("PDA created successfully.");
    }
  );
};

const updatePDA = (req, res) => {
  const id = parseInt(req.params.id);
  const { patient_id, doctor_id, appointment_id } = req.body;

  //check PDA id exist for update or not
  pool.query(queries.getPDAById, [id], (error, results) => {
    const noPDAFound = !results.rows.length;
    if (noPDAFound) {
      res.send("PDA does not exist");
    } else {
      pool.query(
        queries.updatePDA,
        [patient_id, doctor_id, appointment_id, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("PDA updated successfully.");
        }
      );
    }
  });
};

const removePDA = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getPDAById, [id], (error, results) => {
    const noPDAFound = !results.rows.length;
    if (noPDAFound) {
      res.send("PDA does not exist");
    } else {
      // remove process
      pool.query(queries.removePDA, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("PDA remove successfully.");
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
