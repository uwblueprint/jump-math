import { Types } from "mongoose"

export const mockTestSession = {
  test: new Types.ObjectId("62c248c0f79d6c3c9ebbea95"),
  teacher: new Types.ObjectId("62c248c0f79d6c3c9ebbea94"),
  school: new Types.ObjectId("62c248c0f79d6c3c9ebbea93"),
  grade_level: 4,
  access_code: "1234",
  start_time: new Date("2021-09-01T09:00:00.000Z"),
};

export const mockTestSessionWithoutGradeLevel = {
    test: new Types.ObjectId("62c248c0f79d6c3c9ebbea95"),
    teacher: new Types.ObjectId("62c248c0f79d6c3c9ebbea94"),
    school: new Types.ObjectId("62c248c0f79d6c3c9ebbea93"),
    access_code: "1234",
    start_time: new Date("2021-09-01T09:00:00.000Z"),
};

