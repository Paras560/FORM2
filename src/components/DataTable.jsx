import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  SearchIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InputWithIcons } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Pagination from "./Pagination";

const DataTable = ({
  data,
  columns,
  tableTitle,
  filterColumn,
  filterColumnName,
  createAction,
  createActionText,
  hasRowActions,
  selectRowAction,
  reportSelect,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);

  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  useEffect(() => {
    selectRowAction && selectRowAction(table.getSelectedRowModel().rows);
  }, [table.getSelectedRowModel().rows.length, selectRowAction]);

  return (
    <div className="bg-background p-4 rounded-card shadow-strong space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
        <div className="table-title">{tableTitle}</div>

        <div className="flex justify-end items-center gap-2 w-full md:w-auto">
          {reportSelect && reportSelect}
          {createAction && (
            <InputWithIcons
              placeholder={`Search by ${filterColumnName}...`}
              hasLeftIcon="true"
              icon={SearchIcon}
              value={table?.getColumn(filterColumn)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn(filterColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="w-full md:w-auto md:min-w-[296px] bg-background-subtle"
            />
          )}
          {createAction && (
            <Button
              variant="secondaryBrand"
              onClick={createAction}
              className="gap-2"
            >
              <Plus size={20} />
              {createActionText}
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md md:border bg-background">
        <Table className="data-table">
          <TableHeader className="data-table__header bg-background-subtle font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-9">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="data-table__body">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "data-table__row",
                    hasRowActions && "has-actions",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      data-name={
                        cell.column.columnDef.headerTitle ||
                        cell.column.columnDef.header
                      }
                      key={cell.id}
                      className={cn(
                        "data-table__cell",
                        cell.column.columnDef.className,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 text-sm text-muted-foreground">
          Showing
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[57px] px-2">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          of {table.getFilteredRowModel().rows.length}
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronFirst className="h-4 w-4" />
                </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Pagination
            pageSize={table.getState().pagination.pageSize}
            siblingCount={1}
            totalCount={table.getFilteredRowModel().rows.length}
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(value) => {
              table.setPageIndex(value - 1);
            }}
          />
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          {/* <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronLast className="h-4 w-4" />
                </Button> */}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
