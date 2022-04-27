const pool = require("../../db");
const queries = require("./queries");

const getAppointments = async (req, res) => {
  const { patient_id, doctor_id, status } = req.body;

  let resdata = [];

  let doctorinfo = {};
  if (doctor_id) {
    doctorinfo = await pool.query("select * from doctors where id = $1", [
      doctor_id,
    ]);
  }

  if (patient_id && doctor_id) {
    const getAppoint = await pool.query(
      "select * from appointments where patient_id = $1 and doctor_id = $2",
      [patient_id, doctor_id]
    );
    let newdata = [];
    // check doctorinfo
    if (doctorinfo.rowCount > 0) {
      newdata = getAppoint.rows.map((v) => ({
        ...v,
        doctorinfo: doctorinfo.rows[0],
      }));
    } else if (doctorinfo.rowCount === 0) {
      newdata = getAppoint.rows.map((v) => ({
        ...v,
        doctorinfo: "none",
      }));
    }
    resdata = newdata;
    // res.json(newdata);
  } else if (patient_id) {
    const getAppoint = await pool.query(
      "select * from appointments where patient_id = $1",
      [patient_id]
    );
    const ndata = [];

    for (const v of getAppoint.rows) {
      const doctorinfo = await pool.query(
        "select * from doctors where id = $1",
        [v.doctor_id]
      );
      ndata.push({ ...v, doctorinfo: doctorinfo.rows[0] || {} });
    }
    resdata = ndata.filter((v) => v.doctor_id);
    // res.json(ndata.filter((v) => v.doctor_id));
  } else if (doctor_id) {
    const getAppoint = await pool.query(
      "select * from appointments where doctor_id = $1",
      [doctor_id]
    );
    let docdata = [];
    // check doctorinfo
    if (doctorinfo.rowCount > 0) {
      docdata = getAppoint.rows.map((v) => ({
        ...v,
        doctorinfo: doctorinfo.rows[0],
      }));
    } else if (doctorinfo.rowCount === 0) {
      docdata = getAppoint.rows.map((v) => ({
        ...v,
        doctorinfo: "none",
      }));
    }
    resdata = docdata;
    // res.json(docdata);
  } else {
    const queryArray = await pool.query(queries.getAppointments);
    const aData = [];

    for (const v of queryArray.rows) {
      const doctorinfo = await pool.query(
        "select * from doctors where id = $1",
        [v.doctor_id]
      );
      const patientinfo = await pool.query(
        "select * from patients where id = $1",
        [v.patient_id]
      );
      aData.push({
        ...v,
        doctorinfo: doctorinfo.rows[0],
        patientinfo: patientinfo.rows[0] || {},
      });
    }

    if (aData) {
      let temp = [];
      temp = aData.filter((v) => v.doctor_id);
      resdata = temp.filter((v) => v.doctorinfo);
    } else {
      resdata = aData;
    }
  }

  if (status) {
    resdata = resdata.filter((v) => v.status === status);
  }
  res.json(resdata);
};

const getAppointmentById = async (req, res) => {
  const id = parseInt(req.params.id);
  const appoint = await pool.query(queries.getAppointmentById, [id]);
  let response = [];
  if (appoint.rowCount === 0) {
    res.json({ msg: "No appoint found" });
  } else {
    const aData = [];
    for (const v of appoint.rows) {
      const doctorinfo = await pool.query(
        "select * from doctors where id = $1",
        [v.doctor_id]
      );
      aData.push({ ...v, doctorinfo: doctorinfo.rows[0] });
    }

    if (aData) {
      let temp = [];
      temp = aData.filter((v) => v.doctor_id);
      response = temp.filter((v) => v.doctorinfo);
    } else {
      response = { msg: "no doctor in the appointment you requested" };
    }

    res.json(response);
  }
};

const addAppointment = async (req, res) => {
  const { appointdate, appointtimerange, url, status, patient_id, doctor_id } =
    req.body;

  //   {
  //     "appointdate": "2022-04-13T11:53:39.750Z",
  //     "appointtimerange": [
  //         "2022-04-21T19:00:00.303Z",
  //         "2022-04-21T19:30:00.341Z"
  //     ]
  // }

  let data = [];
  let starttime = "";
  let endtime = "";

  if (appointdate && appointtimerange) {
    let adate = appointdate.split("T");
    adate = adate[0];

    let start = appointtimerange[0].split("T")[1];
    let end = appointtimerange[1].split("T")[1];

    starttime = adate + "T" + start;
    endtime = adate + "T" + end;
  }

  const added = await pool.query(queries.addAppointment, [
    starttime,
    endtime,
    url,
    status,
    patient_id,
    doctor_id,
  ]);
  res.status(201).json({
    msg: "Appointment created successfully.",
    appointment: added.rows[0],
  });
};

const updateAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { starttime, endtime, url, status, patient_id, doctor_id } = req.body;
  const eiei =
    "update appointments set starttime = $1, endtime = $2, url = $3, status = $4, patient_id = $5, doctor_id = $6 where id = $7 returning *";
  let queryString = "update appointments set ";
  let number = 1;
  let queryArray = [];
  if (starttime || endtime || url || status || patient_id || doctor_id) {
    if (starttime) {
      if (number === 1) {
        queryString += `starttime = $${number}`;
      } else {
        queryString += `, starttime = $${number}`;
      }
      queryArray.push(starttime);
      number += 1;
    }
    if (endtime) {
      if (number === 1) {
        queryString += `endtime = $${number}`;
      } else {
        queryString += `, endtime = $${number}`;
      }
      queryArray.push(endtime);
      number += 1;
    }
    if (url) {
      if (number === 1) {
        queryString += `url = $${number}`;
      } else {
        queryString += `, url = $${number}`;
      }
      queryArray.push(url);
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
    if (patient_id) {
      if (number === 1) {
        queryString += `patient_id = $${number}`;
      } else {
        queryString += `, patient_id = $${number}`;
      }
      queryArray.push(patient_id);
      number += 1;
    }
    if (doctor_id) {
      if (number === 1) {
        queryString += `doctor_id = $${number}`;
      } else {
        queryString += `, doctor_id = $${number}`;
      }
      queryArray.push(doctor_id);
      number += 1;
    }
    queryString += ` where id = $${number} returning *`;
    queryArray.push(id);
  } else {
    res.json({ msg: "nothing change" });
  }

  const checkAppointExist = await pool.query(queries.getAppointmentById, [id]);
  if (checkAppointExist.rowCount === 0) {
    res.json({ msg: "Appointment not found" });
  } else {
    const added = await pool.query(queryString, queryArray);
    console.log(added.rows);
    res.status(201).json({
      msg: "Appointment updated successfully.",
      appointment: added.rows[0],
    });
  }
};

const removeAppointment = async (req, res) => {
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
