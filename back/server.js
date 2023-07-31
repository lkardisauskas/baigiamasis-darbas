const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());

app.get("/", async (req, res) => {
  const client = await new mongodb.MongoClient(
    "mongodb://127.0.0.1:27017"
  ).connect();
  try {
    const guestDb = await client
      .db("Events")
      .collection("GuestList")
      .find({})
      .toArray();

    console.log("Data from GuestList collection:", guestDb);

    res.json(guestDb);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { name, mail, age } = req.body;

  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useUnifiedTopology: true,
    }
  );

  try {
    if (!name || !mail || !age) {
      res.status(400).send("Some fields are missing (name, mail, age)");
      return;
    }

    await client
      .db("Events")
      .collection("GuestList")
      .insertOne({ name, mail, age });

    res.status(201).send(`Guest ${name} added successfully`);
  } catch (error) {
    console.error("Error adding guest:", error);
    res.status(500).send("Failed to add guest. Please try again.");
  } finally {
    await client.close();
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useUnifiedTopology: true,
    }
  );

  try {
    const result = await client
      .db("Events")
      .collection("GuestList")
      .deleteOne({ _id: new mongodb.ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).send(`Guest with ID ${id} deleted successfully`);
    } else {
      res.status(404).send("Guest not found");
    }
  } catch (error) {
    console.error("Error deleting guest:", error);
    res.status(500).send("Failed to delete guest. Please try again.");
  } finally {
    await client.close();
  }
});

app.listen(port, () => console.log(`Application started on port ${port}`));
