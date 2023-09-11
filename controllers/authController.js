import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../imports.js";

const { APP_SECRET_KEY, APP_REFRESH_KEY } = process.env;

const HandleRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, first_name },
      APP_SECRET_KEY,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign({ userId: newUser._id }, APP_REFRESH_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt-token", token, {
      httpOnly: true,
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const HandleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Invalid crerdentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid crerdentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, APP_SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, APP_REFRESH_KEY, {
      expiresIn: "1d",
    });

    res.cookie("jwt-token", token, {
      httpOnly: true,
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      success: false,
      msg: "Login successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const HandleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt-token")
        res.clearCookie("refresh-token")

        res.status(200).json({success: true, msg: "Logout successfully"})
    }catch(err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { HandleRegister, HandleLogin, HandleLogout };
