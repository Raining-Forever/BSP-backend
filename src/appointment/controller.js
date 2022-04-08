const pool = require("../../db");
const queries = require("./queries");

const getAppointments = (req, res) => {
  pool.query(queries.getAppointments, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAppointmentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAppointmentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addAppointment = (req, res) => {
  const { startTime, endTime, url, status } = req.body;

  pool.query(
    queries.addAppointment,
    [startTime, endTime, url, status],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ msg: "Appointment created successfully." });
    }
  );
};

const updateAppointment = (req, res) => {
  const id = parseInt(req.params.id);
  const { startTime, endTime, url, status } = req.body;

  //check Appointment id exist for update or not
  pool.query(queries.getAppointmentById, [id], (error, results) => {
    const noAppointmentFound = !results.rows.length;
    if (noAppointmentFound) {
      res.json({ msg: "Appointment does not exist" });
    } else {
      pool.query(
        queries.updateAppointment,
        [startTime, endTime, url, status, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).json({ msg: "Appointment updated successfully." });
        }
      );
    }
  });
};

const removeAppointment = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getAppointmentById, [id], (error, results) => {
    const noAppointmentFound = !results.rows.length;
    if (noAppointmentFound) {
      res.json({ msg: "Appointment does not exist" });
    } else {
      // remove process
      pool.query(queries.removeAppointment, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Appointment remove successfully." });
      });
    }
  });
};

module.exports = {
  getAppointments,
  getAppointmentById,
  addAppointment,
  removeAppointment,
  updateAppointment,
};
