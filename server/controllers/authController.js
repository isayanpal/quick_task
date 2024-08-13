const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({ token, message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.json({ token, message: "Login success" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error, message: "Login failed" });
    console.log(error);
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from the Authorization header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const user = await User.findById(decoded.id).select("-password"); // Find the user by ID and exclude the password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return user information
  } catch (error) {
    res.status(401).json({ message: "Not authorized", error });
  }
};

module.exports = { register, login, getUser };
