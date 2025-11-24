import type { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { Inject, type Constructible, type Injection } from 'yasui';
import { entities } from '../entities/index.js';


export * from './product.repository.js';
export * from './order.repository.js';


export function injectRepositories(
  connectDB: () => Promise<EntityManager>
): Injection[] {
  let dbPromise: Promise<EntityManager> | null = null;

  return entities.map(Entity => ({
    token: Entity.name + '_REPOSITORY',
    factory: async (): Promise<Repository<ObjectLiteral>> => {
      if (!dbPromise) {
        dbPromise = connectDB();
      }
      const db = await dbPromise;
      return db.getRepository(Entity);
    },
  }));
}

export function InjectRepository(entity: Constructible): ParameterDecorator {
  return Inject(entity.name + '_REPOSITORY');
}
