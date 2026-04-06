import dotenv from "dotenv";

dotenv.config();

const env = {
  port: parseInt(process.env.PORT ?? "8000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDev: (process.env.NODE_ENV ?? "development") === "development",
};

export default env;
