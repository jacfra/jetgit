import { inject, injectable } from "inversify";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { IDatabaseConnection } from "../database/DatabaseConnection";
import { TYPES } from "../dependency-injection/types";
import { DemoEntity } from "../entity/DemoEntity";
import { IDemoService } from "../service/DemoService";

export interface IDemoResolver {
  demo(): Promise<DemoEntity[]>;
}

@Resolver()
@injectable()
export class DemoResolver implements IDemoResolver {
  constructor(
    @inject(TYPES.DemoService)
    private demoService: IDemoService
  ) {}

  @Query(() => [DemoEntity])
  async demo() {
    return await this.demoService.demo();
  }
}
