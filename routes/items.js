var express = require("express");
var router = express.Router();
const db = require("../model/helper");
//install multer- it's a node.s middleware for handling multipart/form-data, 
//used for uploading files like images 
const multer = require("multer");




//Setting storage engine for multer
const storageEngine = multer.diskStorage({
  //destination is folder where the image with be stored locally
  destination: "./public/images",
  //the call bck function will trigger a function to give each file a unique name
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

//initializing multer and setting some limits about file size and file type
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/; //check extension names

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

// post the image and Store the data and imagePath in your database
router.post("/:id/single", upload.single("image"), async (req, res) => {
  const data = req.body;
  const imagePath = req.file.filename;

  const id = Number(req.params.id);
 

  await db(`UPDATE items SET image = '${imagePath}' WHERE id = ${id};`);

  res.send({
    status: "success",
    message: "Image and data uploaded successfully",
    data: data,
    imagePath: imagePath,
  });
});

// TODO: rename API to be /items/...

/* GET all listings. */
router.get("/", async (req, res) => {
    try {
      const response = await db("SELECT * FROM items ORDER BY id DESC;");
      res.send(response.data)
    } catch(error) {
      res.status(500).send(error)
    }
});

/* GET all available listings. */
router.get("/filter", async (req, res) => {
  const { q } = req.query; 
  const { category } = req.query;
  if (q) {
    try {
      const response = await db(`SELECT * FROM items WHERE available = 1 AND title LIKE "%${q}%" ORDER BY id DESC;`);
      const items = response.data; 

      if (!items) {
        res.status(404).send("No matches found"); 
        return; 
      }
      res.send(response.data); 
    } catch(error) {
      res.status(500).send(error);
    }
  } else if (category) {
    try {
      const response = await db(`SELECT * FROM items WHERE available = 1 AND category = "${category}" ORDER BY id DESC;`);
      const items = response.data; 

      if (!items) {
        res.status(404).send("No matches found");
        return; 
      }
      res.send(response.data);
    } catch(error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const response = await db("SELECT * FROM items WHERE available = 1 ORDER BY id DESC;"); 
      const items = response.data; 
  
      if (!items) {
        res.status(404).send("No available items"); 
        return;
      }
      res.send(response.data);
    } catch(error) {
      res.status(500).send(error);
    }
  }
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
    res.send(response.data[0]);
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
  const category = req.body.category;

  try {
    const result = await db(
      `INSERT INTO items (title, description, image, location, contact, category) VALUES ("${title}", "${description}", "${image}", "${location}", "${contact}", "${category}"); SELECT LAST_INSERT_ID()`
    );
    console.log(result);
    const response = await db("SELECT * FROM items ORDER BY id DESC;");
   
    //returned last id after posting then saved that id to the variabe insertId
    const insertId = result.data[0].insertId;
    
    //return the insertId as well as the response 
    res.status(201).send({ response, insertId });
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
  const category = req.body.category;
  const available = req.body.available; 

  try {
    const response = await db(`SELECT * FROM items WHERE id = ${id}`);
    const item = response.data[0];

    if (!item) {
      res.status(404).send();
      return;
    }

    await db(
      `UPDATE items SET title = "${title}", description = "${description}", image = "${image}", category = "${category}", location = "${location}", contact = "${contact}", available = "${available}" WHERE id = ${id}`
    );

    const items = await db("SELECT * FROM items ORDER BY id DESC;");

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
