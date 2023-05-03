import { Grade } from "../APIClients/types/UserClientTypes";
import { AssessmentProperties } from "../types/AssessmentTypes";
import { GradeOption, StringOption } from "../types/SelectInputTypes";

import {
  includesIgnoreCase,
  removeUnderscore,
  titleCase,
} from "./GeneralUtils";

export const getAssessments = (
  assessment: AssessmentProperties,
): AssessmentProperties => {
  return {
    id: assessment.id,
    status: assessment.status,
    name: assessment.name,
    grade: assessment.grade,
    assessmentType: assessment.assessmentType,
    curriculumCountry: assessment.curriculumCountry,
    curriculumRegion: assessment.curriculumRegion,
  };
};

export const gradeOptions: GradeOption[] = Object.values(Grade).map(
  (grade) => ({
    value: grade,
    label: titleCase(removeUnderscore(grade)),
  }),
);

export interface AssessmentFilterOptions {
  gradeOptions: StringOption[];
  testTypeOptions: StringOption[];
  countryOptions: StringOption[];
  regionOptions: StringOption[];
}

const formatSet = (set: Set<string>): StringOption[] => {
  return Array.from(set)
    .map((value) => ({
      value,
      label: titleCase(removeUnderscore(value)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const assessmentFilterOptions = (
  assessments: AssessmentProperties[],
): AssessmentFilterOptions => {
  const gradesSet = new Set<string>();
  const testTypesSet = new Set<string>();
  const countriesSet = new Set<string>();
  const regionsSet = new Set<string>();

  assessments.forEach((assessment) => {
    gradesSet.add(assessment.grade);
    testTypesSet.add(assessment.assessmentType);
    countriesSet.add(assessment.curriculumCountry);
    regionsSet.add(assessment.curriculumRegion);
  });

  return {
    gradeOptions: formatSet(gradesSet),
    testTypeOptions: formatSet(testTypesSet),
    countryOptions: formatSet(countriesSet),
    regionOptions: formatSet(regionsSet),
  };
};

export const filterAssessments = (
  assessments: AssessmentProperties[],
  filterProps: (string | string[])[],
): AssessmentProperties[] => {
  let filteredTests: AssessmentProperties[] = assessments;

  filterProps.forEach((property, i) => {
    filteredTests = filteredTests.filter((assessment: AssessmentProperties) => {
      const assessmentProperties = [
        assessment.grade,
        assessment.assessmentType,
        assessment.curriculumCountry,
        assessment.curriculumRegion,
        assessment.status,
      ];
      if (property.length === 0) {
        return true;
      }
      return property.includes(assessmentProperties[i]);
    });
  });

  return filteredTests;
};

export const filterAssessmentsBySearch = (
  assessments: AssessmentProperties[],
  search: string,
): AssessmentProperties[] => {
  let filteredTests: AssessmentProperties[] = assessments;
  if (search) {
    filteredTests = filteredTests.filter(
      (assessment: AssessmentProperties) =>
        includesIgnoreCase(assessment.name, search) ||
        includesIgnoreCase(removeUnderscore(assessment.grade), search) ||
        includesIgnoreCase(assessment.curriculumCountry, search) ||
        includesIgnoreCase(assessment.curriculumRegion, search) ||
        includesIgnoreCase(assessment.assessmentType, search),
    );
  }
  return filteredTests?.map(getAssessments);
};
