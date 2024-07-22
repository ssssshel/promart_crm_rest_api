export interface EnvVariables {
  DB_PSW: string
  DB_USERNAME: string
  DB_DATABASE: string
  DB_HOST: string
  DB_PORT: string
}

export interface JwtPayload {
  user_id: number,
  username: string,
  role_id: number
}