const getSymtoms = "SELECT * FROM symtom";
const getSymtomById = "SELECT * FROM symtom WHERE patient_id = $1";
const addSymtom =
  "INSERT INTO symtom (fever, cough, snot, sore_throat, smell, taste, conjunctivitis, rash, liquid_stool, liquid_stool_frequenly, angina, tired, dizzy, pneumonia, complication, sore_breath, slow_response, unconscious, onset_date, diabetes_obesity, complications, cardiovascular, heart_failure, lung_disease, asthma, chronic_lung, malignant_tumors, cancer, chronic_kidney, ckd34, kidney_failure_transplant, rheumatoid_arthritis, immunosuppressants, chronic_liver, respire_rate, pulse, o2_flowrate, patient_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) returning *";
const updateSymtom =
  "UPDATE symtom SET fever = $1, cough = $2, snot = $3, sore_throat = $4, smell = $5, taste = $6, conjunctivitis = $7, rash = $8, liquid_stool = $9, liquid_stool_frequenly = $10, angina = $11, tired = $12, dizzy = $13, pneumonia = $14, complication = $15, sore_breath = $16, slow_response = $17, unconscious = $18, onset_date = $19, diabetes_obesity = $20, complications = $21, cardiovascular = $22, heart_failure = $23, lung_disease = $24, asthma = $25, chronic_lung = $26, malignant_tumors = $27, cancer = $28, chronic_kidney = $29, ckd34 = $30, kidney_failure_transplant = $31, rheumatoid_arthritis = $32, immunosuppressants = $33, chronic_liver = $34, respire_rate = $35, pulse = $36, o2_flowrate = $37 WHERE patient_id = $38";
const removeSymtom = "DELETE FROM symtom WHERE patient_id = $1";

const { getPatientById } = require("../patient/queries");

module.exports = {
  getSymtoms,
  getSymtomById,
  addSymtom,
  updateSymtom,
  removeSymtom,
  getPatientById,
};
