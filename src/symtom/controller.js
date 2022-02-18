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
const addSymtom = (req, res) => {
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
    onset_date,
    diabetes_obesity, //20
    complications,
    cardiovascular,
    heart_failure,
    lung_disease,
    asthma, //25
    chronic_lung,
    malignant_tumors,
    cancer,
    chronic_kidney,
    ckd34, //30
    kidney_failure_transplant,
    rheumatoid_arthritis,
    immunosuppressants,
    chronic_liver,
    respire_rate, //35
    pulse,
    o2_flowrate, //37
  } = req.body;

  pool.query(
    queries.addSymtom,
    [
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
      onset_date,
      diabetes_obesity, //20
      complications,
      cardiovascular,
      heart_failure,
      lung_disease,
      asthma, //25
      chronic_lung,
      malignant_tumors,
      cancer,
      chronic_kidney,
      ckd34, //30
      kidney_failure_transplant,
      rheumatoid_arthritis,
      immunosuppressants,
      chronic_liver,
      respire_rate, //35
      pulse,
      o2_flowrate, //37
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Symtom created successfully.");
    }
  );
};

// update

// delete

module.exports = {
  getSymtoms,
  getSymtomById,
  addSymtom,
};
