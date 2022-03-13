const pool = require("../../db");
const queries = require("./queries");

const getPHRs = (req, res) => {
  pool.query(queries.getPHRs, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPHRById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPHRById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPHR = (req, res) => {
  const { patient_id, hospital_id, reservation_id } = req.body;

  pool.query(
    queries.addPHR,
    [patient_id, hospital_id, reservation_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("PHR created successfully.");
    }
  );
};

const updatePHR = (req, res) => {
  const id = parseInt(req.params.id);
  const { patient_id, hospital_id, reservation_id } = req.body;

  //check PHR id exist for update or not
  pool.query(queries.getPHRById, [id], (error, results) => {
    const noPHRFound = !results.rows.length;
    if (noPHRFound) {
      res.send("PHR does not exist");
    } else {
      pool.query(
        queries.updatePHR,
        [patient_id, hospital_id, reservation_id, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("PHR updated successfully.");
        }
      );
    }
  });
};

const removePHR = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getPHRById, [id], (error, results) => {
    const noPHRFound = !results.rows.length;
    if (noPHRFound) {
      res.send("PHR does not exist");
    } else {
      // remove process
      pool.query(queries.removePHR, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("PHR remove successfully.");
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
