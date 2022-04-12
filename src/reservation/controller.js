const pool = require("../../db");
const queries = require("./queries");

const getReservations = (req, res) => {
  pool.query(queries.getReservations, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getReservationById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getReservationById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addReservation = (req, res) => {
  const { status, checkIn, checkOut } = req.body;

  pool.query(
    queries.addReservation,
    [status, checkIn, checkOut],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ msg: "Reservation created successfully." });
    }
  );
};

const updateReservation = (req, res) => {
  const id = parseInt(req.params.id);
  const { status, checkIn, checkOut } = req.body;

  //check Reservation id exist for update or not
  pool.query(queries.getReservationById, [id], (error, results) => {
    const noReservationFound = !results.rows.length;
    if (noReservationFound) {
      res.json({ msg: "Reservation does not exist" });
    } else {
      pool.query(
        queries.updateReservation,
        [status, checkIn, checkOut, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).json({ msg: "Reservation updated successfully." });
        }
      );
    }
  });
};

const removeReservation = (req, res) => {
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
