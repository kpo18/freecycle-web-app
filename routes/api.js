var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET all listings. */
router.get('/', function(req, res, next) {
  db("SELECT * FROM items ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

/* GET one listing. */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const response = await db(`SELECT * FROM items WHERE id = ${id};`);
    const item = response.data[0];

    if (!item) {
      res.status(404).send("Not found");
      return;
    }
    res.send( response.data[0] );
  } catch (error) {
    res.status(500).send(error);
  }
});

// INSERT a new item into DB
router.post("/", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image; 
  const location = req.body.location; 
  const contact = req.body.contact; 

  try {
    await db(
      `INSERT INTO items (title, description, image, location, contact) VALUES ('${title}', '${description}', '${image}', '${location}', '${contact}');`
    );
    const response = await db("SELECT * FROM items");
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE an item by ID
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image; 
  const location = req.body.location; 
  const contact = req.body.contact; 

  try {
    const response = await db(`SELECT * FROM items WHERE id = ${id}`);
    const item = response.data[0];

    if (!item) {
      res.status(404).send();
      return;
    }

    await db(
      `UPDATE items SET title = '${title}', description = '${description}', image = '${image}', location = '${location}', contact = '${contact}' WHERE id = ${id}`
    );

    const items = await db(`SELECT * FROM items`);

    res.status(200).send(items.data);
  } catch (error) {
    res.status(500).send(error);
  }
});



// DELETE an item from the DB 
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const response = await db(`SELECT * FROM items WHERE id = ${id}`);
    const item = response.data[0];

    if (!item) {
      res.status(404).send("Not found");
      return;
    }
    await db(`DELETE FROM items WHERE id = ${id}`);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
