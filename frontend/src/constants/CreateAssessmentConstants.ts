import { Grade } from "../APIClients/types/UserClientTypes";
import { AssessmentProperties } from "../types/AssessmentTypes";
import { StringOption } from "../types/SelectInputTypes";
import { removeUnderscore, titleCase } from "../utils/GeneralUtils";

export const gradeOptions = Object.values(Grade).map((grade) => ({
  value: grade,
  label: titleCase(removeUnderscore(grade)),
}));

export interface TestFilterOptions {
  gradeOptions: StringOption[];
  testTypeOptions: StringOption[];
  countryOptions: StringOption[];
  regionOptions: StringOption[];
}

export const getTestFilterOptions = (
  assessments: AssessmentProperties[],
): TestFilterOptions => {
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
    gradeOptions: Array.from(gradesSet).map((value) => ({
      value,
      label: titleCase(removeUnderscore(value)),
    })),
    testTypeOptions: Array.from(testTypesSet).map((value) => ({
      value,
      label: titleCase(value),
    })),
    countryOptions: Array.from(countriesSet).map((value) => ({
      value,
      label: titleCase(value),
    })),
    regionOptions: Array.from(regionsSet).map((value) => ({
      value,
      label: titleCase(value),
    })),
  };
};
