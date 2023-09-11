import jwt from "jsonwebtoken";
import { UserModel } from "../imports.js";
const { APP_SECRET_KEY, APP_REFRESH_KEY } = process.env;
export const authenticate = async (req, res, next) => {
  const token = req.cookies["jwt-token"];
  const refreshToken = req.cookies["refresh-token"];

  if (!token && !refreshToken) {
    res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(token, APP_SECRET_KEY);
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }
    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    req.user = userData;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      try {
        const decodeRefresh = jwt.verify(refreshToken, APP_REFRESH_KEY);
        
        const user = await UserModel.findById(decodeRefresh.userId);
        if (!user) {
          return res.status(401).json({
            success: false,
            msg: "Unauthorized",
          });
        }
        const newAccessToken = jwt.sign(
          { userId: user._id },
          APP_SECRET_KEY,
          { expiresIn: "1m" } // Set the expiration time for the new access token
        );

        const userData = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
        req.user = userData;

        // Attach the new access token to the response headers or cookies as needed
        res.cookie("jwt-token", newAccessToken, {
          httpOnly: true,
        });
        next();
      } catch (err) {
        console.error(err);
        res.status(401).json({
          success: false,
          msg: "Unauthorized",
        });
      }
    }
  }
};