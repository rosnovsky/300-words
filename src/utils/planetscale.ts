import { Client } from '@planetscale/database'

const client = new Client({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
})

export const psClient = client.connection()

// DATABASE_HOST = "aws.connect.psdb.cloud"
// DATABASE_USERNAME = "2smuy5xzuk23cnuqf0n4"
// DATABASE_PASSWORD = "pscale_pw_uP8Hia0PloHxKgE1fC6ayJhaezNU4qMLzJXUPhogyx2"
