import TableContainer from "../utils/TableContainer";
import PropTypes from "prop-types";

export default function TkTableContainer(props) {
  const {
    children,
    title,
    columns,
    data,
    actions,
    isSearch,
    onSearchChange,
    defaultPageSize,
    isFilters,
    showPagination,
    rowSelection,
    onRowSelection,
    showSelectedRowCount,
    customPageSize,
    ...other
  } = props;
  return (
    <TableContainer
      columns={columns}
      data={data}
      isSearch={isSearch}
      onSearchChange={onSearchChange}
      defaultPageSize={defaultPageSize}
      showSelectedRowCount={showSelectedRowCount}
      className="custom-header-css"
      divClass="table-responsive table-card mb-3"
      tableClass="align-middle mb-0"
      theadClass="table-light"
      thClass="table-light text-muted"
      isFilters={isFilters}
      showPagination={showPagination}
      rowSelection={rowSelection}
      onRowSelection={onRowSelection}
      customPageSize={customPageSize}
      {...other}
    />
  );
}

TkTableContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  actions: PropTypes.array,
  isSearch: PropTypes.bool,
  defaultPageSize: PropTypes.number,
  isFilters: PropTypes.bool,
  showPagination: PropTypes.bool,
  rowSelection: PropTypes.bool,
  onRowSelection: PropTypes.func,
  customPageSize: PropTypes.bool,
  showSelectedRowCount: PropTypes.bool,
};

TkTableContainer.defaultProps = {
  isSearch: false,
  defaultPageSize: 10,
  isFilters: false,
  showPagination: false,
  rowSelection: false,
  customPageSize: false,
  showSelectedRowCount: false,
};
