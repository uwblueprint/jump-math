import {
    ClassRequestDTO,
    ClassResponseDTO,
  } from "../services/interfaces/classService";
  import { testUsers } from "./users";
  import { mockTestSession } from "./testSession";
  import MgClass, { Class } from "../models/class.model";
  
  // set up test classes
  export const testClass = [
    {
        class_name: "class1",
        school_year: 4,
        grade_level: "4",
        teacher: testUsers[1],
        test_sessions: mockTestSession,
    },
    {
        class_name: "class2",
        school_year: 5,
        grade_level: "5",
        teacher: testUsers[1],
        test_sessions: mockTestSession,
      },
  ];
  
    // set up test class with invalid teacher id
    export const testClassInvalidTeacher = {
        class_name: "class2",
        school_year: 5,
        grade_level: "5",
        teacher: "56cb91bdc3464f14678934cb",
        test_sessions: mockTestSession,
    };

  export const updatedTestClass = {
    class_name: "class1changed",
    school_year: 4,
    grade_level: "4changed",
    teacher: testUsers[1],
    test_sessions: mockTestSession,
  };
  
  export const mockClassWithId = {
    id: "62c248c0f79d6c3c9ebbea93",
    ...testClass[0],
    teachers: testUsers[1],
  };
  
  export const mockClassWithId2 = {
    ...mockClassWithId,
    id: "62c248c0f79d6c3c9ebbea92",
  };
  
  export const assertResponseMatchesExpected = (
    expected: ClassRequestDTO,
    result: ClassResponseDTO,
  ): void => {
    expect(result.id).not.toBeNull();
    expect(result.name).toEqual(expected.name);
    expect(result.country).toEqual(expected.country);
    expect(result.subRegion).toEqual(expected.subRegion);
    expect(result.city).toEqual(expected.city);
    expect(result.address).toEqual(expected.address);
    expect(result.teachers).toEqual(testUsers);
  };