import "dotenv/config";

const {
  DB_CONNECTION,
  DB_HOST,
  // DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const dbConfig = {
  mongoURL: `${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default dbConfig;
