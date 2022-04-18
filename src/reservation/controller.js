const pool = require("../../db");
const queries = require("./queries");

const getReservations = async (req, res) => {
  pool.query(queries.getReservations, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getReservationById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getReservationById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addReservation = async (req, res) => {
  const { status, checkIn, checkOut } = req.body;

  const added = await pool.query(queries.addReservation, [
    status,
    checkIn,
    checkOut,
  ]);
  res.status(201).json({
    msg: "Reservation created successfully.",
    reservation: added.rows[0],
  });
};

const updateReservation = async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, checkIn, checkOut } = req.body;

  const checkReserv = await pool.query(queries.getReservationById, [id]);
  if (checkReserv.rowCount === 0) {
    res.json({ msg: "This reservation not found" });
  } else {
    const updated = await pool.query(queries.updateReservation, [
      status,
      checkIn,
      checkOut,
      id,
    ]);
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
