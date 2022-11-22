import { inject, injectable } from "inversify";
import { IDatabaseConnection } from "../database/DatabaseConnection";
import { TYPES } from "../dependency-injection/types";
import { DemoEntity } from "../entity/DemoEntity";

export interface IDemoSeed {
  seed(): Promise<void>;
}

@injectable()
export class DemoSeed implements IDemoSeed {
  constructor(
    @inject(TYPES.DatabaseConnection)
    private databaseConnection: IDatabaseConnection
  ) {}
  async seed(): Promise<void> {
    const demoSeed = new DemoEntity();
    demoSeed.value = "Hello, World!";

    await this.databaseConnection.getRepository(DemoEntity).save(demoSeed);
  }
}
