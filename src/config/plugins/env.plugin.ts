import 'dotenv/config'
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PUBLIC_PATH: env.get('PUBLIC_PATH').required().asString(),

  POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
  POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
  POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
  DATABASE_URL: env.get('DATABASE_URL').required().asUrlString(),
}
