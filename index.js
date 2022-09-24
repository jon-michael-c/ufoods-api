const express = require("express");
const app = express();
const PORT = 3333;
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const RecipeModel = require("./models/Recipe");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb://mongo:tq7CckBowsZTgpeKacC6@containers-us-west-69.railway.app:7865/ufoods"
    , {useNewUrlParser:true});

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.get("/getRecipes", async (req, res) => {
  RecipeModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/recipe/:id", async (req, res) => {
  RecipeModel.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`);
});
