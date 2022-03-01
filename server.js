const express = require("express");
const userRoutes = require("./src/user_info/router");
const symtomRoutes = require("./src/symtom/router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/symtom", symtomRoutes);

app.listen(PORT, () => {
  console.log("app listening on port ${PORT}");
});
