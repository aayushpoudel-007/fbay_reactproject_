const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const { sendEmail } = require("../middleware/sendEmail");
const createUser = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "The user already exists",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "The user has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "The user does not exist",
      });
    }

    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Login successfull",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
 
    const { oldPassword, newPassword } = req.body;
 
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }
 
    const isMatch = await user.matchPassword(oldPassword);
 
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }
 
    user.password = newPassword;
    await user.save();
 
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
   
    if (!user) {
      return res.json({
        success: false,
        message: "Email not found.",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();
 
    await user.save();
 
    // Assuming you have a configuration variable for the frontend URL
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;
 
    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
 
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
 
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
 
      res.json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
 
const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
 
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
 
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }
 
    user.password = req.body.password;
 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
 
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updatePassword,
  forgotPassword,
  resetPassword
};
