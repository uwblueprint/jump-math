import SchoolService from "../schoolService";

import db from "../../../testUtils/testDb";
import UserService from "../userService";

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
  });
  return { auth };
});

describe("mongo schoolService", (): void => {
  let schoolService: SchoolService;
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    schoolService = new SchoolService(userService);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("create school for valid teachers", async () => {
    // set up test case

    // set up test users to return from user service
    const testUsers = [
      {
        id: "56cb91bdc3464f14678934ca",
        firstName: "Teacher",
        lastName: "One",
        authId: "123",
        role: "Admin",
      },
      {
        id: "56cb91bdc3464f14678934cb",
        firstName: "Teacher",
        lastName: "Two",
        authId: "456",
        role: "Admin",
      },
    ];

    // set up test school to create
    const testSchool = {
      name: "some-name",
      country: "some-country",
      subRegion: "some-region",
      city: "some-city",
      address: "some-address",
      teachers: [testUsers[0].id, testUsers[1].id],
    };

    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const createdSchool = await schoolService.createSchool(testSchool);

    // assert
    expect(createdSchool.id).not.toBeNull();
    expect(createdSchool.name).toEqual(testSchool.name);
    expect(createdSchool.country).toEqual(testSchool.country);
    expect(createdSchool.subRegion).toEqual(testSchool.subRegion);
    expect(createdSchool.city).toEqual(testSchool.city);
    expect(createdSchool.address).toEqual(testSchool.address);
    expect(createdSchool.teachers).toEqual(testUsers);
  });

  it("throw error for non-existing teachers", async () => {
    // set up test case

    // set up test school to create
    const testSchool = {
      name: "some-name",
      country: "some-country",
      subRegion: "some-region",
      city: "some-city",
      address: "some-address",
      teachers: ["56cb91bdc3464f14678934cb"],
    };

    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue([]);

    // execute and assert
    await expect(async () => {
      await schoolService.createSchool(testSchool);
    }).rejects.toThrowError("One or more of the teacher IDs was not found");
  });
});
