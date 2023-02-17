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
  itemsToShow: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
  itemsToShow,
}: PaginationProps): React.ReactElement => {
  const { pages } = usePagination({
    pagesCount,
    initialState: { currentPage },
  });

  return (
    <Box
      bottom="0"
      left="0"
      right="0"
      display="flex"
      justifyContent="center"
      style={{ height: "75px" }}
    >
      <P
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      >
        <PaginationContainer>
          {currentPage !== 1 && (
            <PaginationPrevious
              bg="transparent"
              color="grey.300"
              fontWeight="normal"
              border="none"
              textDecoration="underline"
              _hover={{ textDecoration: "underline", fontWeight: "600" }}
              style={{
                margin: "0 10px",
                height: "75px",
                marginRight: "-39px",
              }}
              outline="none"
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
                    size="PaginationStyle"
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
                    size="PaginationStyle"
                    key={`pagination_ellipsis_${index}`}
                    sx={{
                      bg: "blue.50",
                      color: "grey.300",
                      height: "2.25rem",
                      width: "2.25rem",
                      borderRadius: "50%",
                    }}
                  />
                );
              }
              return null;
            })}
          </PaginationPageGroup>

          {currentPage !== pagesCount && (
            <PaginationNext
              bg="transparent"
              color="grey.300"
              fontWeight="normal"
              border="none"
              textDecoration="underline"
              _hover={{ textDecoration: "underline", fontWeight: "600" }}
              style={{
                margin: "0 10px",
                height: "75px",
                marginLeft: "-50px",
              }}
            >
              Next &gt;
            </PaginationNext>
          )}
        </PaginationContainer>
      </P>
    </Box>
  );
};

export default Pagination;
