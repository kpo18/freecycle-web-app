var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

router.get("/", async (req, res) => {
  try {
    const response = await db("SELECT * FROM users ORDER BY id DESC;");
    res.send(response.data)
  } catch(error) {
    res.status(500).send(error)
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const results = await db(
    `SELECT * FROM users WHERE username = "${username}"`
  );
  const user = results.data[0];
  if (user) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
    );

    

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (correctPassword) {
        var token = jwt.sign({ user_id }, supersecret);
        res.send({ message: "Login successful, here is your token", token });
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  const userID = req.user_id; 
  try {
    const results = await db(
      `SELECT * FROM users WHERE id = "${userID}"`
    );
    const user = results.data[0];
    if (!user) {
      res.status(404).send("Not found");
      return; 
    }
    res.send(results.data[0]); 
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/products", userShouldBeLoggedIn, (req, res) => {
  res.send({
    products: [],
  });
});

module.exports = router;