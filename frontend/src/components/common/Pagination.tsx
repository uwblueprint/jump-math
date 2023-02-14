import React, { useEffect } from "react";
import { extendTheme, chakra, ChakraProvider } from "@chakra-ui/react";
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
  components: {
    PaginationSeparator: {
      baseStyle: {
        height: "2.25rem",
        width: "2.25rem",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "2rem",
        display: "inline-block",
        margin: "0 2px",
        position: "relative",
        "&::before": {
          content: `"..."`,
          fontSize: "0px",
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
      defaultProps: {
        isDisabled: true,
        bg: "#E8EDF1",
        color: "#636363",
      },
    },
  },
};

const outerLimit = 2;
const innerLimit = 1;

const Pagination = (): React.ReactElement => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 10, // can change how many pages we want
    initialState: { currentPage: 1 },
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
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
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                onClick={() => console.warn("I'm clicking the separator")}
                bg="#E8EDF1"
                sx={{
                  height: "2.25rem",
                  width: "2.25rem",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "2rem",
                  display: "inline-block",
                  margin: "0 2px",
                  position: "relative",
                  bg: "#E8EDF1",
                  color: "#E8EDF1",
                  "&::before": {
                    content: `"..."`,
                    fontSize: "20px",
                    position: "absolute",
                    top: "37%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#636363",
                  },
                }}
              />
            }
          >
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
