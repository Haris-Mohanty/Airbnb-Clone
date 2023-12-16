import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

//****************** USER REGISTRATION ******************/
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please Provide All Fields!",
      });
    }
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character!",
      });
    }

    //Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
      });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Create User
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({
      message: "User Registered Successfully!",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in register user API!",
      error: err.message,
    });
  }
};

//****************** USER LOGIN ******************/
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
      });
    }
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
      });
    }

    //Check Registered user
    const registeredUser = await userModel.findOne({ email });
    if (!registeredUser) {
      return res.status(404).json({
        message: "Invalid Credentials!",
      });
    }

    //Compare Password
    const comparePassword = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect Password, Please check again!",
      });
    }

    //Login Success
    return res.status(200).json({
      message: "Login Success!",
      registeredUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in Login user API!",
      error: err.message,
    });
  }
};
