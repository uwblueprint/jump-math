import TestSessionService from "../testSessionService";

import mockTestSession from "../../../testUtils/testSession";
import db from "../../../testUtils/testDb";
import testSessionModel from "../../../models/testSession.model";

const { ObjectId } = require("mongodb");

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    testSessionService = new TestSessionService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTestSession", async () => {
    const res = await testSessionService.createTestSession(mockTestSession);

    expect(res.id).not.toBeNull();
    expect(res).toMatchObject({
      id: res.id,
      ...mockTestSession,
    });
  });

  it("getTestSession", async () => {
    const testSession = new testSessionModel(mockTestSession);
    const savedTestSession = await testSession.save();

    const res = await testSessionService.getTestSessionById(
      savedTestSession.id,
    );

    expect(res.id).toBe(savedTestSession.id);
    expect(res.gradeLevel).toBe(savedTestSession.gradeLevel);
    expect(res.accessCode).toBe(savedTestSession.accessCode);
    expect(res.startTime.toISOString()).toBe(
      savedTestSession.startTime.toISOString(),
    );
    expect(res.teacher.toString()).toBe(
      ObjectId(savedTestSession.teacher).toString(),
    );
    expect(res.test.toString()).toBe(
      ObjectId(savedTestSession.test).toString(),
    );
    expect(res.school.toString()).toBe(
      ObjectId(savedTestSession.school).toString(),
    );
  });
});
