import { Client } from "pg";

export default async function (): Promise<Client> {
  const client = new Client({
    user: import.meta.env.MAIN_VITE_POSTGRES_USER,
    password: import.meta.env.MAIN_VITE_POSTGRES_PASSWORD,
    host: import.meta.env.MAIN_VITE_POSTGRES_HOST,
    port: +import.meta.env.MAIN_VITE_POSTGRES_PORT,
    database: import.meta.env.MAIN_VITE_POSTGRES_DB_NAME,
  });
  await client.connect();

  return client;
}
