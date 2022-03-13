const express = require("express");
const userRoutes = require("./src/user/router");
const symtomRoutes = require("./src/symtom/router");
const patientRoutes = require("./src/patient/router");
const doctorRoutes = require("./src/doctor/router");
const hospitalRoutes = require("./src/hospital/router");
const appointmentRoutes = require("./src/appointment/router");
const reservationRoutes = require("./src/reservation/router");
const pdaRoutes = require("./src/patient_doctor_appointment/router");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/patient", patientRoutes);
app.use("/api/user", userRoutes);
app.use("/api/symtom", symtomRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/pda", pdaRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
