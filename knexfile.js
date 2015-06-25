// Update with your config settings.

module.exports = {

  client: 'postgresql',
  connection: {
    database: 'todo',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'list'
  }

};