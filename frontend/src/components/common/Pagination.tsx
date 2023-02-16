import React, { useEffect } from "react";
import { extendTheme, chakra, ChakraProvider, Box } from "@chakra-ui/react";
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
          fontSize: "1.5rem",
          position: "absolute",
          top: "50%",
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
    <ChakraProvider theme={customTheme}>
      <Box display="flex" justifyContent="center" style={{ height: "75px" }}>
        <P
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
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
                  );
                }
                return null;
              })}
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
      </Box>
    </ChakraProvider>
  );
};

export default Pagination;
