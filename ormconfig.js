module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PSW || 'postgres',
  database: process.env.DB_NAME || 'nest-api',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'true',
};
