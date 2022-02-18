const getSymtoms = "SELECT * FROM symtom";
const getSymtomById = "SELECT * FROM symtom WHERE id = $1";
const addSymtom =
  "INSERT INTO symtom (fever, cough, snot, sore_throat, smell, taste, conjunctivitis, rash, liquid_stool, liquid_stool_frequenly, angina, tired, dizzy, pneumonia, complication, sore_breath, slow_response, unconscious, onset_date, diabetes_obesity, complications, cardiovascular, heart_failure, lung_disease, asthma, chronic_lung, malignant_tumors, cancer, chronic_kidney, ckd34, kidney_failure_transplant, rheumatoid_arthritis, immunosuppressants, chronic_liver, respire_rate, pulse, o2_flowrate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37)";

module.exports = {
  getSymtoms,
  getSymtomById,
  addSymtom,
};
