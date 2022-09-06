declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    WEBSERVER_PORT: string
    DB_URI: string
  }
}