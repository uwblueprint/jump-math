import React from "react";

export default function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number,
) {
  const res: Array<number> = [];

  // handle lastPage less than maxLength
  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i += 1) {
      res.push(i);
    }
  }

  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j += 1) {
        res.push(j);
      }

      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k += 1) {
        res.push(k);
      }
    }

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l += 1
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    }

    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m += 1) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n += 1) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o -= 1) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p -= 1) {
          res.unshift(p);
        }
      }
    }
  }

  return res;
}
