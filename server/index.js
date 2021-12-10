const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./Routes/userRoute");
require("dotenv/config");
//Middle Wares
app.use(cors());
app.use(express.json());
app.use("/user", user)
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("Connected to DataBase successfully");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
