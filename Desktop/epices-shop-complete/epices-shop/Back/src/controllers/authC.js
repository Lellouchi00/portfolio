
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists",type:'email' });
    }
     const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role:req.body.role
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
};
