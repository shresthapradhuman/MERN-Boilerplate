const express = require("express");
const app = express();
const port = 3001;

/** Database Connection */
const mongoose = require("mongoose");
const URI = "mongodb://db:27017/mongodb";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => console.log(error));

/** Create User Schema */
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
});
const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes GET, POST, UPDATE, DELETE */
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/register", async (req, res) => {
  /** mongoose create code */
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({ success: "created successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const users = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { password: req.body.password }
    );
    res.status(200).json({ success: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ success: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.listen(port, (error) => {
  error && console.log(error);
  console.log(`Server is listening at port ${port}`);
});
