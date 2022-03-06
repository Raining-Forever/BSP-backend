const express = require("express");
const userRoutes = require("./src/user/router");
const symtomRoutes = require("./src/symtom/router");
const patientRoutes = require("./src/patient/router");
const doctorRoutes = require("./src/doctor/router");
const hospitalRoutes = require("./src/hospital/router");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/patients", patientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/symtom", symtomRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/hospitals", hospitalRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
