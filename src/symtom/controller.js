const pool = require("../../db");
const queries = require("./queries");

// list
const getSymtoms = (req, res) => {
  pool.query(queries.getSymtoms, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// retrieve
const getSymtomById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getSymtomById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// add
const addSymtom = async (req, res) => {
  const {
    fever,
    cough,
    snot,
    sore_throat,
    smell, //5
    taste,
    conjunctivitis,
    rash,
    liquid_stool,
    liquid_stool_frequenly, //10
    angina,
    tired,
    dizzy,
    pneumonia,
    complication, //15
    sore_breath,
    slow_response,
    unconscious,
    onset_date, //ส่วนที่ 1 จบ
    diabetes_obesity, //20 เริ่ม 2
    complications,
    cardiovascular, //โรคหัวใจและหลอดเลือด
    heart_failure,
    lung_disease, // โรคปอด
    asthma, //25
    chronic_lung,
    malignant_tumors, // เนื้องอก
    cancer,
    chronic_kidney, // โรคไตเรื้อรัง
    ckd34, //30
    kidney_failure_transplant,
    rheumatoid_arthritis,
    immunosuppressants,
    chronic_liver, // จบ 2
    respire_rate, //35
    pulse,
    o2_flowrate, //37
    patient_id,
    result,
    score,
  } = req.body;
  // const { patient_id, result } = req.body;
  // console.log(result);

  const checkSymtomExist = await pool.query(queries.getSymtomById, [
    patient_id,
  ]);

  const checkPatientExist = await pool.query(
    "select * from patients where id = $1",
    [patient_id]
  );
  if (checkPatientExist.rowCount === 0) {
    res.json({
      msg: "Patient not exist",
    });
  } else {
    if (checkSymtomExist.rowCount > 0) {
      res.json({ msg: "Symtom already exist" });
    } else {
      const addSymtom = await pool.query(
        `INSERT INTO symtom (score, patient_id) values ($1, $2) returning *`,
        [score, patient_id]
      );
      res.json({ msg: "Symtom created", symtom: addSymtom.rows[0] });
    }
  }
  // check symtom already created or not
  // pool.query(queries.getSymtomById, [patient_id], (error, results) => {
  //   const symtomFound = results.rows.length;
  //   if (symtomFound) {
  //     res.json({ msg: "Symtom already exist" });
  //   } else {
  //     pool.query(
  //       queries.addSymtom,
  //       [
  //         fever,
  //         cough,
  //         snot,
  //         sore_throat,
  //         smell, //5
  //         taste,
  //         conjunctivitis,
  //         rash,
  //         liquid_stool,
  //         liquid_stool_frequenly, //10
  //         angina,
  //         tired,
  //         dizzy,
  //         pneumonia,
  //         complication, //15
  //         sore_breath,
  //         slow_response,
  //         unconscious,
  //         onset_date,
  //         diabetes_obesity, //20
  //         complications,
  //         cardiovascular,
  //         heart_failure,
  //         lung_disease,
  //         asthma, //25
  //         chronic_lung,
  //         malignant_tumors,
  //         cancer,
  //         chronic_kidney,
  //         ckd34, //30
  //         kidney_failure_transplant,
  //         rheumatoid_arthritis,
  //         immunosuppressants,
  //         chronic_liver,
  //         respire_rate, //35
  //         pulse,
  //         o2_flowrate, //37
  //         patient_id,
  //       ],
  //       (error, results) => {
  //         if (error) throw error;
  //         res.status(201).json({ msg: "Symtom created successfully." });
  //       }
  //     );
  //   }
  // });
};

// update
const updateSymtom = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    fever,
    cough,
    snot,
    sore_throat,
    smell,
    taste,
    conjunctivitis,
    rash,
    liquid_stool,
    liquid_stool_frequenly,
    angina,
    tired,
    dizzy,
    pneumonia,
    complication,
    sore_breath,
    slow_response,
    unconscious,
    onset_date,
    diabetes_obesity,
    complications,
    cardiovascular,
    heart_failure,
    lung_disease,
    asthma,
    chronic_lung,
    malignant_tumors,
    cancer,
    chronic_kidney,
    ckd34,
    kidney_failure_transplant,
    rheumatoid_arthritis,
    immunosuppressants,
    chronic_liver,
    respire_rate,
    pulse,
    o2_flowrate,
    score,
    patient_id,
  } = req.body;

  const checkSymtomExist = await pool.query(queries.getSymtomById, [id]);
  const checkPatientExist = await pool.query(
    "select * from patients where id = $1",
    [id]
  );
  if (checkPatientExist.rowCount === 0) {
    res.json({ msg: "Patient not exist" });
  } else {
    if (checkSymtomExist.rowCount === 0) {
      res.json({ msg: "Symtom of this patient_id not exist" });
    } else {
      const updatedSymtom = await pool.query(
        "update symtom set score = $1 where patient_id = $2 returning *",
        [score, id]
      );
      res
        .status(201)
        .json({ msg: "Symtom updated", symtom: updatedSymtom.rows[0] });
    }
  }
};

// delete
const removeSymtom = (req, res) => {
  const id = parseInt(req.params.id);

  // check that symtom exist or not
  pool.query(queries.getSymtomById, [id], (error, results) => {
    const noSymtomFound = !results.rows.length;
    if (noSymtomFound) {
      res.json({ msg: "Symtom does not exist" });
    } else {
      // remove process
      pool.query(queries.removeSymtom, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: "Symtom remove successfully." });
      });
    }
  });
};

module.exports = {
  getSymtoms,
  getSymtomById,
  addSymtom,
  updateSymtom,
  removeSymtom,
};
