import React from "react";
import {
  Pagination as P,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from "@ajna/pagination";
import { HStack } from "@chakra-ui/react";

const outerLimit = 1;
const innerLimit = 1;

interface PaginationProps {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
}: PaginationProps): React.ReactElement => {
  const { pages } = usePagination({
    pagesCount,
    initialState: { currentPage },
  });

  return (
    <P
      currentPage={currentPage}
      onPageChange={onPageChange}
      pagesCount={pagesCount}
    >
      <PaginationContainer>
        {currentPage !== 1 && (
          <PaginationPrevious
            size="paginationNavigate"
            variant="paginationNavigate"
          >
            &lt; Previous
          </PaginationPrevious>
        )}
        <HStack align="center">
          {pages.map((page: number, index: number) => {
            if (
              index === 0 ||
              index === pages.length - 1 ||
              (index >= currentPage - innerLimit - 1 &&
                index <= currentPage + innerLimit - 1)
            ) {
              return (
                <PaginationPage
                  key={`pagination_page_${page}`}
                  _current={{
                    bg: "blue.100",
                    color: "grey.100",
                  }}
                  page={page}
                  size="paginationStyle"
                  variant="paginationStyle"
                />
              );
            }
            if (
              (index === currentPage - innerLimit - 2 &&
                currentPage > outerLimit + innerLimit + 1) ||
              (index === currentPage + innerLimit &&
                currentPage < pagesCount - outerLimit - innerLimit)
            ) {
              return (
                <PaginationSeparator
                  key={`pagination_ellipsis_${index}`}
                  size="paginationStyle"
                  sx={{
                    opacity: "1 !important",
                    bg: "blue.50",
                    color: "grey.300",
                  }}
                />
              );
            }
            return null;
          })}
        </HStack>

        {currentPage !== pagesCount && (
          <PaginationNext
            size="paginationNavigate"
            variant="paginationNavigate"
          >
            Next &gt;
          </PaginationNext>
        )}
      </PaginationContainer>
    </P>
  );
};

export default Pagination;
