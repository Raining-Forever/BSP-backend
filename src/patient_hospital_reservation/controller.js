const pool = require("../../db");
const queries = require("./queries");

const getPHRs = async (req, res) => {
  const { patient_id, hospital_id, status } = req.body;

  let query = [];
  if (patient_id) {
    const patientPHR = await pool.query(
      "select * from patient_hospital_reservation where patient_id = $1",
      [patient_id]
    );
    query = patientPHR.rows;
  } else if (hospital_id) {
    const hospitalPHR = await pool.query(
      "select * from patient_hospital_reservation where hospital_id = $1",
      [hospital_id]
    );
    query = hospitalPHR.rows;
  } else {
    const getAll = await pool.query(
      "select * from patient_hospital_reservation"
    );
    query = getAll.rows;
  }

  if (status) {
    query = query.filter((v) => v.status === status);
  }

  let temp = [];
  for (const v of query) {
    const patientData = await pool.query(
      "select * from patients where id = $1",
      [v.patient_id]
    );
    const hospitalData = await pool.query(
      "select * from hospitals where id = $1",
      [v.hospital_id]
    );
    if (patientData.rowCount > 0)
      temp.push({
        ...v,
        patientinfo: patientData.rows[0] || {},
        hospitalinfo: hospitalData.rows[0] || {},
      });
  }
  query = temp;

  res.json(query);
};

const getPHRById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPHRById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPHR = async (req, res) => {
  const { patient_id, hospital_id, reservation_id, status } = req.body;

  const added = await pool.query(queries.addPHR, [
    patient_id,
    hospital_id,
    reservation_id,
    status,
  ]);
  res
    .status(201)
    .json({ msg: "PHR created successfully.", phr: added.rows[0] });
};

const updatePHR = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    patient_id,
    hospital_id,
    reservation_id,
    status,
    checkin_date,
    checkin_time,
  } = req.body;

  let queryString = "update patient_hospital_reservation set ";
  let number = 1;
  let queryArray = [];
  if (patient_id || hospital_id || reservation_id || status) {
    if (patient_id) {
      if (number === 1) {
        queryString += `patient_id = $${number}`;
      } else {
        queryString += `, patient_id = $${number}`;
      }
      queryArray.push(patient_id);
      number += 1;
    }
    if (hospital_id) {
      if (number === 1) {
        queryString += `hospital_id = $${number}`;
      } else {
        queryString += `, hospital_id = $${number}`;
      }
      queryArray.push(hospital_id);
      number += 1;
    }
    if (reservation_id) {
      if (number === 1) {
        queryString += `reservation_id = $${number}`;
      } else {
        queryString += `, reservation_id = $${number}`;
      }
      queryArray.push(reservation_id);
      number += 1;
    }
    if (status) {
      if (number === 1) {
        queryString += `status = $${number}`;
      } else {
        queryString += `, status = $${number}`;
      }
      queryArray.push(status);
      number += 1;
    }
    if (checkin_date && checkin_time) {
      let date = "";
      let time = "";
      let checkin = "";
      date = checkin_date.split("T")[0];
      time = checkin_time.split("T")[1];
      checkin = date + "T" + time;
      if (number === 1) {
        queryString += `checkin = $${number}`;
      } else {
        queryString += `, checkin = $${number}`;
      }
      console.log(checkin);
      queryArray.push(checkin);
      number += 1;
    }
    queryString += ` where id = $${number} returning *`;
    queryArray.push(id);
  } else {
    res.json({ msg: "nothing change" });
  }

  const checkPHR = await pool.query(queries.getPHRById, [id]);
  if (checkPHR.rowCount === 0) {
    res.json({ msg: "this phr_id not found" });
  } else {
    const updated = await pool.query(queryString, queryArray);
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
