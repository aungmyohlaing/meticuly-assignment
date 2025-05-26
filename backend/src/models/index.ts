// models/index.ts
import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initCustomerModel, Customer } from './customer';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false,
  // other options
});
initUserModel(sequelize),
initCustomerModel(sequelize)

export { sequelize, Sequelize, User, Customer };
