const pool = require("../../db");
const queries = require("./queries");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

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
    if (checkAppointExist.rows[0].status === 1 && status === 2) {
      const patientEmail = await pool.query(
        "select email from patients where id = $1",
        [patient_id]
      );
      const doctorEmail = await pool.query(
        "select email from doctors where id = $1",
        [doctor_id]
      );
      const attendeesEmails = [
        { email: patientEmail.rows[0].email },
        { email: doctorEmail.rows[0].email },
      ];
      let start_string = new Date(starttime).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
      });
      let end_string = new Date(endtime).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
      });
      let date_start = new Date(start_string);
      let date_end = new Date(end_string);
      const event = {
        summary: "Coding class",
        location: "Virtual / Google Meet",
        description: "Learn how to code with Javascript",
        start: {
          dateTime: date_start,
          timeZone: "Asia/Bangkok",
        },
        end: {
          dateTime: date_end,
          timeZone: "Asia/Bangkok",
        },
        attendees: attendeesEmails,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
            requestId: "coding-calendar-demo",
          },
        },
      };
      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      const calendar = google.calendar({ version: "v3", auth });
      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      });

      const {
        config: {
          data: { summary, location, start, end, attendees },
        },
        data: { conferenceData },
      } = response;

      // Get the Google Meet conference URL in order to join the call
      const { uri } = conferenceData.entryPoints[0];
      console.log(
        `📅 Calendar event created: ${summary} at ${location}, from ${
          start.dateTime
        } to ${end.dateTime}, attendees:\n${attendees
          .map((person) => `🧍 ${person.email}`)
          .join("\n")} \n 💻 Join conference call link: ${uri}`
      );

      console.log(date_start, date_end);
      res.json(patientEmail.rows[0].email);
    }

    // const added = await pool.query(queryString, queryArray);
    // console.log(added.rows);
    // res.status(201).json({
    //   msg: "Appointment updated successfully.",
    //   appointment: added.rows[0],
    // });
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
