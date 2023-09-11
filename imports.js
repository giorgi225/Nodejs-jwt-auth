// Config
import dbConfig from "./config/db.config.js";
import serverConfig from "./config/server.config.js";
export { dbConfig, serverConfig };

// Controllers
export * from "./controllers/authController.js";

// Middlewares
export * from "./middlewares/validator.js";
export * from "./middlewares/authenticate.js";

// Models
import UserModel from "./models/UserModel.js";
export { UserModel };

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
export { authRoutes, userRoutes };
