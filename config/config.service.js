import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV;
const envPaths = {
  development: ".env.development",
  production: ".env.production",
};
const envFile = envPaths[NODE_ENV];

const fullPath = path.resolve(__dirname, envFile);
config({ path: fullPath });

export const PORT = process.env.PORT;
