import {
  createConnection,
  EntityTarget,
  getConnection,
  Migration,
  MigrationInterface,
  QueryRunner,
  ReplicationMode,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { Connection } from "typeorm";

export interface IDatabaseConnection {
  createQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<any>;
  createQueryRunner(mode?: ReplicationMode): QueryRunner;
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
  runMigrations(options?: {
    transaction?: "all" | "none" | "each";
  }): Promise<Migration[]>;
  migrations: MigrationInterface[];
  isConnected: boolean;
  undoLastMigration(options?: {
    transaction?: "all" | "none" | "each";
  }): Promise<void>;
}

export const createOrGetDatabaseConnection = async () => {
  const connectionName = "serve";
  return await createConnection(connectionName).catch(() => {
    return getConnection(connectionName);
  });
};

export type DatabaseConnection = Connection;
