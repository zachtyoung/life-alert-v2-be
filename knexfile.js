// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  development: {
    client: 'sqlite3',
    connection: { filename: './database/events_log.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },



};
