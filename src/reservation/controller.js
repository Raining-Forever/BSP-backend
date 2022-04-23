const pool = require("../../db");
const queries = require("./queries");

const getReservations = async (req, res) => {
  const { patient_id, hospital_id, status } = req.body;
  let response = [];

  if (patient_id && hospital_id) {
    const getReserv = await pool.query(
      "select * from reservation where patient_id = $1 and hospital_id = $2",
      [patient_id, hospital_id]
    );
    const hosinfo = await pool.query("select * from hospitals where id = $1", [
      hospital_id,
    ]);

    let hosdata = [];
    if (hosinfo.rowCount > 0) {
      hosdata = getReserv.rows.map((v) => ({
        ...v,
        hospitalinfo: hosinfo.rows[0],
      }));
    } else {
      hosdata = getReserv.rows.map((v) => ({
        ...v,
        hospitalinfo: "none",
      }));
    }

    response = hosdata;
  } else if (patient_id) {
    const getReserv = await pool.query(
      "select * from reservation where patient_id = $1",
      [patient_id]
    );
    const resdata = [];
    for (const v of getReserv.rows) {
      const hosinfo = await pool.query(
        "select * from hospitals where id = $1",
        [v.hospital_id]
      );
      resdata.push({ ...v, hospitalinfo: hosinfo.rows[0] || {} });
    }
    response = resdata.filter((v) => v.hospital_id);
  } else if (hospital_id) {
    const getReserv = await pool.query(
      "select * from reservation where hospital_id = $1",
      [hospital_id]
    );
    const hosinfo = await pool.query("select * from hospitals where id = $1", [
      hospital_id,
    ]);

    let hosdata = [];
    if (hosinfo.rowCount > 0) {
      hosdata = getReserv.rows.map((v) => ({
        ...v,
        hospitalinfo: hosinfo.rows[0],
      }));
    } else {
      hosdata = getReserv.rows.map((v) => ({
        ...v,
        hospitalinfo: "none",
      }));
    }

    response = hosdata;
  } else {
    const getReserv = await pool.query(queries.getReservations);
    let resdata = [];
    for (const v of getReserv.rows) {
      const hosinfo = await pool.query(
        "select * from hospitals where id = $1",
        [v.hospital_id]
      );
      resdata.push({ ...v, hospitalinfo: hosinfo.rows[0] || {} });
    }
    if (resdata) {
      resdata = resdata.filter((v) => v.hospital_id);
      response = resdata.filter((v) => v.hospitalinfo);
    } else {
      response = [];
    }
  }

  if (status) {
    response = response.filter((v) => v.status === status);
  }
  res.json(response);
};

const getReservationById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getReservationById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addReservation = async (req, res) => {
  const { status, checkIn, checkOut, patient_id, hospital_id } = req.body;

  const added = await pool.query(queries.addReservation, [
    status,
    checkIn,
    checkOut,
    patient_id,
    hospital_id,
  ]);
  res.status(201).json({
    msg: "Reservation created successfully.",
    reservation: added.rows[0],
  });
};

const updateReservation = async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, checkIn, checkOut, patient_id, hospital_id } = req.body;
  const roeo =
    "update reservation set status = $1, checkIn = $2, checkOut = $3, patient_id = $4, hospital_id = $5 where id = $6 returning *";
  let queryString = "update reservation set ";
  let number = 1;
  let queryArray = [];
  const checkReserv = await pool.query(queries.getReservationById, [id]);
  if (checkReserv.rowCount === 0) {
    res.json({ msg: "This reservation not found" });
  } else {
    if (status || checkIn || checkOut || patient_id || hospital_id) {
      if (status) {
        if (number === 1) {
          queryString += `status = $${number}`;
        } else {
          queryString += `, status = $${number}`;
        }
        queryArray.push(status);
        number += 1;
      }
      if (checkIn) {
        if (number === 1) {
          queryString += `checkIn = $${number}`;
        } else {
          queryString += `, checkIn = $${number}`;
        }
        queryArray.push(checkIn);
        number += 1;
      }
      if (checkOut) {
        if (number === 1) {
          queryString += `checkOut = $${number}`;
        } else {
          queryString += `, checkOut = $${number}`;
        }
        queryArray.push(checkOut);
        number += 1;
      }
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
      queryString += ` where id = $${number} returning *`;
      queryArray.push(id);
    } else {
      res.json({ msg: "nothing change" });
    }
    const updated = await pool.query(queryString, queryArray);
    res.status(201).json({
      msg: "reservation updated successfully",
      reservation: updated.rows[0],
    });
  }
};

const removeReservation = async (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getReservationById, [id], (error, results) => {
    const noReservationFound = !results.rows.length;
    if (noReservationFound) {
      res.json({ msg: "Reservation does not exist" });
    } else {
      // remove process
      pool.query(queries.removeReservation, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Reservation remove successfully." });
      });
    }
  });
};

module.exports = {
  getReservations,
  getReservationById,
  addReservation,
  removeReservation,
  updateReservation,
};
