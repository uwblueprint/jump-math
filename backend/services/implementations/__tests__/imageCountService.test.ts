import db from "../../../testUtils/testDb";
import ImageCountService from "../imageCountService";

describe("mongo imageCountService", (): void => {
  let imageCountService: ImageCountService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    imageCountService = new ImageCountService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("initialize count", async () => {
    const referenceCount = await imageCountService.initializeCount("test path");
    expect(referenceCount).toEqual(1);
  });

  it("increment count", async () => {
    await imageCountService.initializeCount("test path");
    const referenceCount = await imageCountService.incrementCount("test path");
    expect(referenceCount).toEqual(2);
  });

  it("decrement count", async () => {
    await imageCountService.initializeCount("test path");
    const referenceCount = await imageCountService.decrementCount("test path");
    expect(referenceCount).toEqual(0);

    await expect(async () => {
      await imageCountService.decrementCount("test path");
    }).rejects.toThrowError(`Image test path not found`);
  });
});
