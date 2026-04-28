import Database from "better-sqlite3";
import { betterAuth } from "better-auth";

const databasePath = process.env.DATABASE_PATH || "./data/ecommerce.db";

export const auth = betterAuth({
  database: new Database(databasePath),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});