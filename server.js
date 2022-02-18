const express = require("express");
const userRoutes = require("./src/user/router");
const symtomRoutes = require("./src/symtom/router");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/symtom", symtomRoutes);

app.listen(port, () => {
  console.log("app listening on port 3000");
});
