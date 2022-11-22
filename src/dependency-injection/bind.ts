import { Container } from "inversify";
import {
  createOrGetDatabaseConnection,
  IDatabaseConnection,
} from "../database/DatabaseConnection";
import { DemoResolver, IDemoResolver } from "../resolver/DemoResolver";
import { DemoSeed, IDemoSeed } from "../seed/DemoSeed";
import { DemoService, IDemoService } from "../service/DemoService";
import { TYPES } from "./types";

const container = new Container();
// database
container
  .bind<IDatabaseConnection>(TYPES.DatabaseConnection)
  .toDynamicValue(createOrGetDatabaseConnection)
  .inSingletonScope();

// seed
container.bind<IDemoSeed>(TYPES.DemoSeed).to(DemoSeed);

// service
container.bind<IDemoService>(TYPES.DemoService).to(DemoService);

// resolver
container.bind<IDemoResolver>(DemoResolver).toSelf();

export { container };
