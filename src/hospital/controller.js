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
      let queryString = "update hospitals set ";
      let number = 1;
      let queryArray = [];
      if (
        user_id ||
        hospital_name ||
        hospital_number ||
        bed_total ||
        bed_occupied ||
        tel ||
        address ||
        province ||
        district ||
        subdistrict ||
        postalcode
      ) {
        if (user_id) {
          if (number === 1) {
            queryString += `user_id = $${number}`;
          } else {
            queryString += `, user_id = $${number}`;
          }
          queryArray.push(user_id);
          number += 1;
        }
        if (hospital_name) {
          if (number === 1) {
            queryString += `hospital_name = $${number}`;
          } else {
            queryString += `, hospital_name = $${number}`;
          }
          queryArray.push(hospital_name);
          number += 1;
        }
        if (hospital_number) {
          if (number === 1) {
            queryString += `hospital_number = $${number}`;
          } else {
            queryString += `, hospital_number = $${number}`;
          }
          queryArray.push(hospital_number);
          number += 1;
        }
        if (bed_total) {
          if (number === 1) {
            queryString += `bed_total = $${number}`;
          } else {
            queryString += `, bed_total = $${number}`;
          }
          queryArray.push(bed_total);
          number += 1;
        }
        if (bed_occupied) {
          if (number === 1) {
            queryString += `bed_occupied = $${number}`;
          } else {
            queryString += `, bed_occupied = $${number}`;
          }
          queryArray.push(bed_occupied);
          number += 1;
        }
        if (tel) {
          if (number === 1) {
            queryString += `tel = $${number}`;
          } else {
            queryString += `, tel = $${number}`;
          }
          queryArray.push(tel);
          number += 1;
        }
        if (address) {
          if (number === 1) {
            queryString += `address = $${number}`;
          } else {
            queryString += `, address = $${number}`;
          }
          queryArray.push(address);
          number += 1;
        }
        if (province) {
          if (number === 1) {
            queryString += `province = $${number}`;
          } else {
            queryString += `, province = $${number}`;
          }
          queryArray.push(province);
          number += 1;
        }
        if (district) {
          if (number === 1) {
            queryString += `district = $${number}`;
          } else {
            queryString += `, district = $${number}`;
          }
          queryArray.push(district);
          number += 1;
        }
        if (subdistrict) {
          if (number === 1) {
            queryString += `subdistrict = $${number}`;
          } else {
            queryString += `, subdistrict = $${number}`;
          }
          queryArray.push(subdistrict);
          number += 1;
        }
        if (postalcode) {
          if (number === 1) {
            queryString += `postalcode = $${number}`;
          } else {
            queryString += `, postalcode = $${number}`;
          }
          queryArray.push(postalcode);
          number += 1;
        }
        queryString += ` where id = $${number} returning *`;
        queryArray.push(id);
      } else {
        res.json({ msg: "nothing change" });
      }
      const updatedHospital = await pool.query(queryString, queryArray);
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
