import React from "react";
import { Box } from "@chakra-ui/react";
import {
  Pagination as P,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from "@ajna/pagination";

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
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={onPageChange}
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
        <PaginationPageGroup isInline align="center">
          {pages.map((page: number, index: number) => {
            if (
              index === 0 ||
              index === pages.length - 1 ||
              (index >= currentPage - innerLimit - 1 &&
                index <= currentPage + innerLimit - 1)
            ) {
              return (
                <PaginationPage
                  size="paginationStyle"
                  variant="PaginationStyle"
                  key={`pagination_page_${page}`}
                  page={page}
                  _current={{
                    bg: "blue.100",
                    fontFamily: "DM Sans",
                    borderRadius: "50%",
                    color: "grey.100",
                  }}
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
                  size="paginationStyle"
                  key={`pagination_ellipsis_${index}`}
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
        </PaginationPageGroup>

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
