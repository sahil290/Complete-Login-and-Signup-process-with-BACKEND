const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
//Lets create some Routes
router.post("/", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });
  try {
    const saveNewUser = await newUser.save();
    res.status(200).json(saveNewUser);
  } catch (err) {
    res.json({ err: message });
  }
});
//Route for login user
//Unfortunately this route didn't work
// router.post("/login", async (req, res) => {
//   try {
//     const userName = await User.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (userName) {
//       res.status(200).send("User found");
//     } else {
//       res.status(400).send("User not found");
//     }
//   } catch (err) {
//     res.send({ message: err });
//   }
// });
router.post("/loginTwo", (req, res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(422).send({err :"Fill all fields"})
  }
   User.findOne({
    email: email, 
    password: password,
  })
  .then((user)=>{
    if(!user){
      return res.status(404).send({err:"user not found"});
    }else{
      return res.status(200).send({ message:"User found" });
    }
  })
})
//Route for getting users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.send({ message: err });
  }
});
//Get a specific user by id
router.get("/:userId", async (req, res) => {
  try {
    const findOneUser = await User.findById(req.params.userId);
    res.status(200).json(findOneUser);
  } catch (err) {
    res.send({ message: err });
  }
});
//Delete a user from database
router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).send(deleteUser);
  } catch (err) {
    res.send({ message: err });
  }
});
module.exports = router;
