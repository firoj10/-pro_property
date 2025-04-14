const TableCell = ({ children, className }) => {
  return <td className={`px-3 text-base ${className}`}>{children}</td>;
};

export default TableCell;
