const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// routes

// get all
app.get("/students", async (req, res) => {
  const allStudents = await pool.query(
    "SELECT * from student",
    (error, results, fields) => {
      if (error) throw error;
      return res.json({ data: results.rows, message: "success" });
    }
  );
});

// get a
app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  const student = await pool.query(
    "SELECT * FROM student WHERE id = $1",
    [id],
    (error, results, fields) => {
      if (error) throw error;
      return res.json({ data: results.rows[0], message: "success" });
    }
  );
});

// create

app.post("/create", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let age = req.body.age;
  const newStudent = await pool.query(
    "INSERT INTO student (firstname, lastname, age) VALUES ($1, $2, $3) RETURNING *",
    [firstname, lastname, age],
    (error, results, fields) => {
      if (error) throw error;
      return res.json({
        data: results.rows,
        message: "success",
      });
    }
  );
});

// update

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, age } = req.body;

  const update = await pool.query(
    "UPDATE student SET firstname = $1, lastname = $2, age = $3 WHERE id = $4",
    [firstname, lastname, age, id]
  );
  return res.json({
    message: "updated",
  });
});

// delete

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const del = await pool.query("DELETE from student WHERE id = $1", [id]);
  res.json({
    message: "deleted",
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
