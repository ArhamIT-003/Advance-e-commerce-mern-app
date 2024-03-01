import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

const saltRounds = 10;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      const verifyPass = await bcrypt.compare(password, foundUser.password);
      if (verifyPass) {
        // if password is verified then create a token
        const token = generateToken(res, foundUser._id);
        res
          .status(200)
          .json({ message: "User logged in successfully", foundUser, token });
      } else {
        res.status(200).json({ message: "Email or password doesn't exist" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    // throw new Error("An error occured while login user.", err);
    console.log(err);
    res
      .status(501)
      .json({ message: "An error occured while login user.", err });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // check if the user is already registered
    const verifyEmail = await User.findOne({ email: email });

    if (verifyEmail) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      // create a new user
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      const token = generateToken(res, newUser._id);

      res
        .status(200)
        .json({ message: "User created successfully", newUser, token });
    }
  } catch (error) {
    // throw new Error("An error occured while registering user.", error);
    console.log(error);
    res
      .status(501)
      .json({ message: "An error occured while registering user.", error });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "User logged out successfully" });
};

export { loginUser, registerUser, logoutUser };
