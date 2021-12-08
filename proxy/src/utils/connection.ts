import { Pool } from "pg";

export default new Pool({
  connectionString: "postgresql://tes:password@localhost:5432/development_db",
});
