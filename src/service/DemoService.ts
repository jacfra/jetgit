import { inject, injectable } from "inversify";
import { IDatabaseConnection } from "../database/DatabaseConnection";
import { TYPES } from "../dependency-injection/types";
import { DemoEntity } from "../entity/DemoEntity";

export interface IDemoService {
  demo(): Promise<DemoEntity[]>;
}

@injectable()
export class DemoService implements IDemoService {
  constructor(
    @inject(TYPES.DatabaseConnection)
    private databaseConnection: IDatabaseConnection
  ) {}
  async demo(): Promise<DemoEntity[]> {
    return await this.databaseConnection.getRepository(DemoEntity).find();
  }
}
