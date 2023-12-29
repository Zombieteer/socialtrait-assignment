export const credentials = {
  local: {
    databaseConnections: {
      postgres: {
        database: 'socialtraitdb',
        username: 'socialtrait',
        password: 'socialtrait',
        params: {
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
        },
      },
    },
  },
};
