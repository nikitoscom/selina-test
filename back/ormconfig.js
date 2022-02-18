module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'selina',

  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
