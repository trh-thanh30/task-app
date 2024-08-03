const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/user.model");
const { authenticateToken } = require("../verifyToken");
const router = express.Router();
router.post("/api/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName) {
      return res
        .status(400)
        .json({ error: true, message: "Full name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }
    const user = new User({
      fullName,
      email,
      password,
    });
    await user.save();
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    return res.status(200).json({
      error: false,
      user,
      accessToken,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }
    if (user.email == email && user.password == password) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m",
      });
      return res.status(200).json({
        error: false,
        email,
        accessToken,
        message: "User logged in successfully",
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});
router.get("/api/get-users", authenticateToken, async (req, res) => {
  try {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }
    return res.status(200).json({
      error: false,
      isUser: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
    });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});
module.exports = router;
