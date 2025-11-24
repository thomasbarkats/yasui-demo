import type { DataSource, EntityManager } from 'typeorm';
import { createServer, getEnv, LoggerService } from 'yasui';
import { AppDataSource } from './config/database.config.js';
import { ProductsController, OrdersController } from './controllers/index.js';
import { ClassValidatorPipe } from './pipes/index.js';
import { injectRepositories } from './repositories/index.js';


const PORT = parseInt(getEnv('PORT', '3000'));
const isDev = getEnv('NODE_ENV', 'development') === 'development';
const logger = new LoggerService();
logger.start();


const connectDB = (): Promise<EntityManager> => AppDataSource(isDev)
  .initialize()
  .then((dataSource: DataSource) => {
    logger.success('Database connected!');
    return dataSource.createEntityManager();
  })
  .catch(err => {
    logger.error('Database connection error: ' + err);
    throw err;
  });


await createServer({
  port: PORT,
  debug: isDev,
  controllers: [ProductsController, OrdersController],
  globalPipes: [ClassValidatorPipe],
  injections: [...injectRepositories(connectDB)],
  swagger: {
    generate: true,
    path: 'docs',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'Full API example with TypeORM and class-validator',
    },
  },
});


console.log(`
  Full API Demo - E-Commerce

  Swagger UI: http://localhost:${PORT}/docs

  Public endpoints:
    GET    http://localhost:${PORT}/api/products
    GET    http://localhost:${PORT}/api/products/:id
    POST   http://localhost:${PORT}/api/products
    PATCH  http://localhost:${PORT}/api/products/:id
    DELETE http://localhost:${PORT}/api/products/:id

    GET    http://localhost:${PORT}/api/orders
    GET    http://localhost:${PORT}/api/orders/:id
    POST   http://localhost:${PORT}/api/orders
`);
