import { Inject } from '@nestjs/common';

export const getRepositoryToken = (entity: any) =>
  typeof entity === 'function' ? `${entity.name}Repository` : `${entity}Repository`;

export const InjectRepository = (entity: any) => Inject(getRepositoryToken(entity));

export class TypeOrmModule {
  static forRoot = jest.fn(() => ({ module: TypeOrmModule }));
  static forRootAsync = jest.fn(() => ({ module: TypeOrmModule }));
  static forFeature = jest.fn(() => ({ module: TypeOrmModule }));
}
