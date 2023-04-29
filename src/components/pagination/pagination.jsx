import "./pagination.scss";

const Pagination = (props) => {
  return (
    <div className="pagination">
      <button
        className="btn-page"
        disabled={props.currentPage === 0}
        onClick={props.prevPage}
      >
        Previous
      </button>{" "}
      {props.currentPage + 1} of {props.pageCountSize}
      <button
        className="btn-page"
        disabled={props.currentPage === props.pageCountSize - 1}
        onClick={props.nextPage}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
