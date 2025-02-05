/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly POSTGRES_USER: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_HOST: string;
  readonly POSTGRES_PORT: string;
  readonly POSTGRES_DB_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
