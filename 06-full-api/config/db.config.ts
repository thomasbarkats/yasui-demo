import { DataSource } from 'typeorm';
import { entities } from '../entities/index.js';
import { getEnv } from 'yasui';


export const AppDataSource = (isDev: boolean): DataSource => new DataSource({
  type: 'sqljs',
  location: getEnv('DB_PATH', './06-full-api/database.sqlite'),
  autoSave: true,
  synchronize: isDev,
  logging: false,
  entities,
  migrations: [],
  subscribers: [],
});
