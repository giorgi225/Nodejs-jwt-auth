import "dotenv/config";

const serverConfig = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
};

export default serverConfig