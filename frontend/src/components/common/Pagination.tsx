import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Pagination as P,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

const Pagination = (): React.ReactElement => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 6,
    initialState: { currentPage: 1 },
  });

  return (
    <ChakraProvider>
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
              outline="none"
            >
              &lt; Previous
            </PaginationPrevious>
          )}

          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage
                w={10}
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
                  w: 10,
                  borderRadius: "50%",
                  color: "#F4F4F4",
                }}
                style={{ borderRadius: "50%" }}
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
