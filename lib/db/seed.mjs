import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const connectionString = "postgresql://neondb_owner:npg_zkAV0tu7qLCK@ep-lucky-dawn-atzk8kro-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
const pool = new pg.Pool({ connectionString });
const db = drizzle(pool);

async function seed() {
  await db.execute(`INSERT INTO users (cedula, nombre, rol) VALUES ('1234567890', 'Administrador UTE', 'admin') ON CONFLICT (cedula) DO NOTHING;`);
  console.log("Seeded default user.");
  process.exit(0);
}
seed();
