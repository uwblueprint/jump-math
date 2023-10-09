import type { ReactElement } from "react";
import React from "react";
import { Box, Grid } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import EmptyClassroomsGoToPageMessage from "../../common/info/messages/EmptyClassroomsGoToPage";
import QueryStateHandler from "../../common/QueryStateHandler";
import ClassroomCard, {
  CLASSROOM_CARD_STYLES,
} from "../student-management/classroom-summary/ClassroomCard";
import type { QueryOptions } from "../student-management/classroom-summary/useClassDataQuery";
import useClassDataQuery from "../student-management/classroom-summary/useClassDataQuery";

import useViewAllLimitedData from "./useViewAllLimitedData";
import ViewAllLink from "./ViewAllLink";

const QUERY_LIMIT = 6;

const QUERY_DATA_OPTIONS: QueryOptions = {
  limit: QUERY_LIMIT,
  sort: {
    updatedAt: "DESC",
  },
  excludeArchived: true,
};

const ClassroomsSection = (): ReactElement => {
  const { loading, error, data } = useClassDataQuery(QUERY_DATA_OPTIONS);
  const [limitedData, showViewAll] = useViewAllLimitedData(data, QUERY_LIMIT);

  return (
    <QueryStateHandler error={error} loading={loading}>
      <Box mt={8}>
        {limitedData?.length ? (
          <Grid autoRows="1fr" gap={4} templateColumns="repeat(3, 1fr)">
            {limitedData?.map(
              ({
                id,
                activeAssessments,
                assessmentCount,
                gradeLevel,
                isActive,
                className,
                startDate,
                studentCount,
              }) => (
                <ClassroomCard
                  key={id}
                  activeAssessments={activeAssessments}
                  assessmentCount={assessmentCount}
                  grade={gradeLevel}
                  id={id}
                  isActive={isActive}
                  isDashboardVariant
                  name={className}
                  startDate={startDate}
                  studentCount={studentCount}
                />
              ),
            )}
            {showViewAll && (
              <ViewAllLink
                borderRadius={CLASSROOM_CARD_STYLES.BORDER_RADIUS}
                h={CLASSROOM_CARD_STYLES.HEIGHT}
                to={Routes.CLASSROOMS_PAGE}
              />
            )}
          </Grid>
        ) : (
          <EmptyClassroomsGoToPageMessage />
        )}
      </Box>
    </QueryStateHandler>
  );
};

export default ClassroomsSection;
