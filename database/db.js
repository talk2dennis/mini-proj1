import { Client } from "pg";
import dotenv from "dotenv";
import process from "process";


dotenv.config();

// validate .env variables
const requiredEnvVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD"];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});
client.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => {
    console.error("Connection error", err.message)
    process.exit(1);
});

export default client;
// This code connects to a PostgreSQL database using the pg library and environment variables for configuration.