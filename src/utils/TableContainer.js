import React, { Fragment, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  // useAsyncDebounce, // gives problem
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table } from "reactstrap";
import { DefaultColumnFilter } from "./Filter";
import { TaskListGlobalFilter } from "./SearchFilters";
import { environment } from "./Constants";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkInput from "@/globalComponents/TkInput";
import TkIcon from "@/globalComponents/TkIcon";
import { TkCardBody } from "@/globalComponents/TkCard";
import TkButton from "@/globalComponents/TkButton";

// Define a default UI for filtering
function GlobalFilter({ isSearch, onSearchChange, isFilters }) {
  return (
    <>
      <TkCardBody className="border border-dashed border-end-0 border-start-0">
        <TkRow>
          {isSearch && (
            <TkCol sm={4}>
              <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
                <TkInput
                  onChange={(e) => onSearchChange(e)}
                  id="search-bar-0"
                  type="text"
                  className="form-control search /"
                  placeholder={`Search...`}
                />
                <TkIcon className="bx bx-search-alt search-icon"></TkIcon>
              </div>
            </TkCol>
          )}
          {/* remove the filters temporarly */}
          {isFilters && <TaskListGlobalFilter />}
        </TkRow>
      </TkCardBody>
    </>
  );
}

const IndeterminateCheckbox = React.forwardRef(function IndeterminateCheckbox({ indeterminate, ...rest }, ref) {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <TkInput type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const TableContainer = ({
  columns,
  data,
  isSearch,
  onSearchChange,
  isFilters,
  defaultPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  showPagination,
  rowSelection,
  onRowSelection,
  showSelectedRowCount,
  customPageSize,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      disableSortBy: true,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize || 1000_000, // just a large number to show all rows on one page, It's just a workaround, and works all the time as no one is going to have pag size of 100,000
        selectedRowIds: 0,
        // sortBy: [
        //   {
        //     desc: true,
        //   },
        // ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (!rowSelection) return;
      hooks.visibleColumns.push((columns) => [
        // A column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    //TODO:remove the below check in production
    if (rowSelection) {
      if (environment !== "production") {
        if (onRowSelection) {
          onRowSelection(selectedFlatRows);
        } else {
          console.error("onRowSelection prop is required when rowSelection is true");
        }
      } else {
        onRowSelection(selectedFlatRows);
      }
    }
  }, [rowSelection, selectedFlatRows, onRowSelection]);

  if (environment !== "production") {
    if (showPagination && !defaultPageSize) {
      console.error(
        "pagination is true but no defaultPageSize prop is provided, without defaultPageSize pagination will not work, and all data will we shown on single page"
      );
    }
    if (isSearch && !onSearchChange) {
      console.error("isSearch is true but onSearchChange prop is not provided in TableContainer");
    }
  }

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  const onChangeInInput = (event) => {
    let pageNum = Number(event.target.value) ? Number(event.target.value) - 1 : 0;
    pageNum = Math.floor(pageNum);
    gotoPage(pageNum);
  };

  return (
    <>
      <TkRow className="mb-3">
        {isSearch || isFilters ? (
          <GlobalFilter
            isSearch={isSearch}
            //TODO: remove this in production
            onSearchChange={onSearchChange ? onSearchChange : () => {}}
            isFilters={isFilters}
          />
        ) : null}

        <TkCol>
          {showSelectedRowCount && <p> {selectedFlatRows?.length ? selectedFlatRows.length + " rows selected" : null} </p>}
        </TkCol>

        {/* {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button type="button" color="success" className="btn-rounded mb-2 me-2" onClick={handleCustomerClick}>
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )} */}
      </TkRow>

      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={thClass} {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      {showPagination && (
        <TkRow className="justify-content-md-end justify-content-center align-items-center p-2">
          {customPageSize && (
            <TkCol className="col-md-auto d-flex">
              {/* not using TkSelect intentionally */}
              <select className="form-select" value={pageSize} onChange={onChangeInSelect}>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </TkCol>
          )}
          <TkCol className="col-md-auto">
            <div className="d-flex gap-1">
              <TkButton color="primary" onClick={previousPage} disabled={!canPreviousPage}>
                {"<"}
              </TkButton>
            </div>
          </TkCol>
          <TkCol className="col-md-auto d-none d-md-block">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </TkCol>
          <TkCol className="col-md-auto">
            <TkInput
              type="text"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </TkCol>

          <TkCol className="col-md-auto">
            <div className="d-flex gap-1">
              <TkButton color="primary" onClick={nextPage} disabled={!canNextPage}>
                {">"}
              </TkButton>
            </div>
          </TkCol>
        </TkRow>
      )}
    </>
  );
};

export default TableContainer;
