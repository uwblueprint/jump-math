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
    subRegion: "some-region",
    city: "some-city",
    address: "some-address",
    teachers: [testUsers[0].id, testUsers[1].id],
  },
  {
    name: "school2",
    country: "some-country",
    subRegion: "some-region",
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

/**
 * This method asserts that all attributes in the school response match the expected values
 *
 * @param school The test School object response
 * @param testSchool The test School object request
 */
export function assertResponseMatchesExpected(
  school: SchoolResponseDTO,
  testSchool: SchoolRequestDTO,
): void {
  expect(school.id).not.toBeNull();
  expect(school.name).toEqual(testSchool.name);
  expect(school.country).toEqual(testSchool.country);
  expect(school.subRegion).toEqual(testSchool.subRegion);
  expect(school.city).toEqual(testSchool.city);
  expect(school.address).toEqual(testSchool.address);
  expect(school.teachers).toEqual(testUsers);
}
