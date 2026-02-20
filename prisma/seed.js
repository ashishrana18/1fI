import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from "fs";
import path from "path";
import "dotenv/config";

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Reading seed.sql...");
  const sql = fs.readFileSync(
    path.join(process.cwd(), "prisma/seed.sql"),
    "utf8"
  );

  // Clean up the SQL: remove comments and split by semicolon
  const cleanSql = sql
    .replace(/--.*$/gm, "") // Remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments

  const statements = cleanSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Executing ${statements.length} SQL statements...`);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }

  await prisma.$disconnect();
  console.log("Seeding completed successfully.");
}

main().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
