import React from "react";
import getPaginationItems from "./PaginationComponets";
import PageLink from "./PageLink";
import "./PaginationStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className="pagination pagination-circle" aria-label="Pagination">
      {currentPage !== 1 && (
        <PageLink
          className="underline-text"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </PageLink>
      )}
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          className="page-link-circle"
          active={currentPage === pageNum}
          disabled={Number.isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {!Number.isNaN(pageNum) ? pageNum : "..."}
        </PageLink>
      ))}

      {currentPage !== lastPage && (
        <PageLink
          className="underline-text"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </PageLink>
      )}
    </nav>
  );
}
