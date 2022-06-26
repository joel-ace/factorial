import 'dotenv/config';

const SERVER_PORT = process.env.PORT || 3030;
const environment = process.env.NODE_ENV || 'development';
const mongoUrl = {
  development: process.env.DEV_DATABASE ,
  test: process.env.TEST_DATABASE,
  production: process.env.PRODUCTION_DATABASE,
};

export const config = {
  mongo: {
    url: mongoUrl[environment] || '',
  },
  SERVER_PORT,
};
