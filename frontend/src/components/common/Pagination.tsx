import React from "react";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import {
  Pagination as P,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

const customTheme = {
  ...chakra,
  fonts: {
    body: '"DM Sans"',
    heading: '"DM Sans"',
    mono: '"DM Sans"',
  },
  colors: {
    brand: {
      900: "#154472",
    },
  },
};

const Pagination = (): React.ReactElement => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 6,
    initialState: { currentPage: 1 },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <P
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PaginationContainer>
          {currentPage !== 1 && (
            <PaginationPrevious
              bg="transparent"
              color="#636363"
              fontWeight="normal"
              border="none"
              textDecoration="underline"
              _hover={{ textDecoration: "underline", fontWeight: "600" }}
              style={{
                margin: "0 10px",
              }}
              outline="none"
            >
              &lt; Previous
            </PaginationPrevious>
          )}

          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage
                bg="#E8EDF1"
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                color="#636363"
                _hover={{
                  bg: "#A1B4C7",
                }}
                _current={{
                  bg: "#A1B4C7",
                  fontFamily: "DM Sans",
                  borderRadius: "50%",
                  color: "#F4F4F4",
                }}
                style={{
                  height: "2.25rem",
                  width: "2.25rem",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "2rem",
                  display: "inline-block",
                  margin: "0 2px",
                }}
              />
            ))}
          </PaginationPageGroup>
          {currentPage !== pagesCount && (
            <PaginationNext
              bg="transparent"
              color="#636363"
              fontWeight="normal"
              border="none"
              textDecoration="underline"
              _hover={{ textDecoration: "underline", fontWeight: "600" }}
              style={{
                margin: "0 10px",
              }}
            >
              Next &gt;
            </PaginationNext>
          )}
        </PaginationContainer>
      </P>
    </ChakraProvider>
  );
};

export default Pagination;
