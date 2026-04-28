import * as dotenv from "dotenv";
import crypto from "crypto";
import { db, user } from "../src/lib/db";
import { eq } from "drizzle-orm";
import { generateId } from "../src/lib/db/utils";

dotenv.config({ path: ".env.local" });

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");

  return `scrypt$${salt}$${derivedKey}`;
}

async function seedAdmin() {
  try {
    const adminEmail = "contact.ali10@gmail.com";
    const adminName = "Ali Haider";
    const adminPassword = "alihaider";
    const passwordHash = hashPassword(adminPassword);

    // Check if user already exists
    const existingUserResult = await db
      .select()
      .from(user)
      .where(eq(user.email, adminEmail))
      .limit(1);

    const existingUser = existingUserResult[0];

    if (existingUser) {
      // Update existing user to admin
      await db
        .update(user)
        .set({
          role: "admin",
          name: adminName,
          password: passwordHash,
          updatedAt: new Date(),
        })
        .where(eq(user.id, existingUser.id));
      console.log(`\nUpdated existing user "${adminEmail}" to admin role`);
    } else {
      // Create a placeholder admin user
      // Note: authUserId will be updated when the user signs up
      await db.insert(user).values({
        id: generateId(),
        authUserId: `admin_${Date.now()}`,
        email: adminEmail,
        name: adminName,
        password: passwordHash,
        role: "admin",
        phone: null,
        shippingAddress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`\nCreated admin user with email: ${adminEmail}`);
    }

    console.log("\n=================================");
    console.log("Admin User Details:");
    console.log("=================================");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Name: ${adminName}`);
    console.log(`Role: admin`);
    console.log("=================================");
    console.log("\nIMPORTANT: Sign up at /auth/register with these credentials,");
    console.log("then run this script again to grant admin role.");
    console.log("=================================\n");

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
