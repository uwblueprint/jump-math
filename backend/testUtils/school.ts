import {
  SchoolRequestDTO,
  SchoolResponseDTO,
} from "../services/interfaces/schoolService";

// set up test users to return from mock user service
export const testUsers = [
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

// set up test schools
export const testSchools = [
  {
    name: "school1",
    country: "some-country",
    subRegion: "some-region1",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
  {
    name: "school2",
    country: "some-country",
    subRegion: "some-region2",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
];

// set up test schools
export const testSchools2 = [
  {
    name: "school1",
    country: "some-country1",
    subRegion: "some-region1",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
  {
    name: "school2",
    country: "some-country1",
    subRegion: "some-region2",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
  {
    name: "school1",
    country: "some-country2",
    subRegion: "some-region1",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
  {
    name: "school2",
    country: "some-country3",
    subRegion: "some-region2",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
];

// set up test school with invalid teacher id
export const testSchoolInvalidTeacher = {
  name: "some-name",
  country: "some-country",
  subRegion: "some-region",
  city: "some-city",
  address: "some-address",
  teachers: ["56cb91bdc3464f14678934cb"],
};

export const updatedTestSchool = {
  name: "school1Changed",
  country: "some-country2Changed",
  subRegion: "some-region1Changed",
  city: "some-cityChanged",
  address: "some-addressChanged",
  teachers: [testUsers[0].id, testUsers[1].id],
};

export const assertResponseMatchesExpected = (
  expected: SchoolRequestDTO,
  result: SchoolResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.name).toEqual(expected.name);
  expect(result.country).toEqual(expected.country);
  expect(result.subRegion).toEqual(expected.subRegion);
  expect(result.city).toEqual(expected.city);
  expect(result.address).toEqual(expected.address);
  expect(result.teachers).toEqual(testUsers);
};
