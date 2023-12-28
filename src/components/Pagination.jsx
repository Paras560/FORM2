import React from "react"
import { usePagination } from "@/hooks/usePagination"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const Pagination = ({
  siblingCount = 1,
  currentPage,
  totalCount,
  pageSize,
  className,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  console.log("first", paginationRange)

  // let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul className={cn("flex gap-2", className)}>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === "...") {
          return (
            <li
              key={pageNumber}
              className="list-none"
            >
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => console.log(pageNumber)}
                // onClick={() => table.previousPage()}
                // disabled={!table.getCanPreviousPage()}
              >
                &#8230;
              </Button>
            </li>
          )
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={cn(
              "list-none",
              pageNumber === currentPage && "selected"
            )}
            // onClick={() => onPageChange(pageNumber)}
          >
            {console.log(pageNumber)}
            <Button
              variant="outline"
              className="h-8 w-8 p-0 disabled:bg-primary disabled:text-primary-foreground disabled:opacity-100"
              onClick={() => onPageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </Button>
          </li>
        )
      })}
    </ul>
  )
  // return <div>Pagination</div>
}

export default Pagination
