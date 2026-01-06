import type { FC } from "react";
import './Pagination.scss'
import ReactPaginate from "react-paginate"

interface IPagination {
    limit: number;
    currentPage: number;
    totalCount: number;
    onChangePage: (num: number) => void 
}

const Pagination:FC<IPagination> = ({ limit, currentPage, totalCount, onChangePage }) => {
    
    const totalPage = Math.ceil(totalCount / limit)
    
  return (
   <>
    <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
   </>
  )
}

export default Pagination