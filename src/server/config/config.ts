export const config = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'boilerplate',
    user: process.env.DB_USER || 'root',
    passwors: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'mongoose',
      host: process.env.HOST || 'localhost',
      storage: 'mongodb://localhost:27017'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};