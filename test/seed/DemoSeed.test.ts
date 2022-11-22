import "reflect-metadata";
import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { TYPES } from "../../src/dependency-injection/types";
import { DemoEntity } from "../../src/entity/DemoEntity";
import { DemoResolver, IDemoResolver } from "../../src/resolver/DemoResolver";
import { IDemoSeed } from "../../src/seed/DemoSeed";
import { mockContainer } from "../_setup/mockBind";

beforeEach(async () => {
  mockContainer.snapshot();
  const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
  await demoSeed.seed();
});

afterEach(() => {
  mockContainer.restore();
  jest.clearAllMocks();
});

describe("DemoSeed", () => {
  test(`DemoSeed.seed`, async () => {
    const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();

    const databaseConnection =
      await mockContainer.getAsync<IDatabaseConnection>(
        TYPES.DatabaseConnection
      );

    const result = await databaseConnection.getRepository(DemoEntity).findOne();

    const expected = { value: "Hello, World!" };

    expect(result.value).toBe(expected.value);
  });
});
