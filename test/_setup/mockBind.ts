import { createConnection, getConnection } from "typeorm";
import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { container } from "../../src/dependency-injection/bind";
import { TYPES } from "../../src/dependency-injection/types";

container.snapshot();
const mockContainer = container;

mockContainer
  .rebind<IDatabaseConnection>(TYPES.DatabaseConnection)
  .toDynamicValue(async () => {
    const connectionName = "test";
    return await createConnection(connectionName).catch(() => {
      return getConnection(connectionName);
    });
  })
  .inSingletonScope();

export { mockContainer };
