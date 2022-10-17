require("./db/conn");
const express = require("express");
const app = express();
//user define module of students
const Student = require("./models/students");
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/students", (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (err) {
    res.send(err);
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const singleData = await Student.findById(_id);
    console.log(singleData);
    res.send(singleData);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/students/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    if (!req.params.id) {
      return res.status(400).send();
    } else {
      const deleteStudent = await Student.findByIdAndDelete(_id);
      res.send(deleteStudent);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

app.patch("/students/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudent);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`connect with ${port} successfully`);
});
