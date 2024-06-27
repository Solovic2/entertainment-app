import ReactPaginate from "react-paginate";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  dataTestId: string;
  handlePageChange: (selectedItem: { selected: number }) => void;
}
const Pagination = ({
  totalPages,
  handlePageChange,
  currentPage,
  dataTestId,
}: PaginationProps) => {
  return (
    <div data-test-id={dataTestId}>
      <ReactPaginate
        nextAriaLabel="next-page"
        previousAriaLabel="previous-page"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
        previousLabel={<GrCaretPrevious />}
        nextLabel={<GrCaretNext />}
        previousClassName="hover:text-primaryRed"
        nextClassName="hover:text-primaryRed"
        breakLabel={"..."}
        breakClassName="hover:text-primaryRed"
        breakLinkClassName="block w-full"
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        className="mt-5 flex items-center justify-center gap-5 text-white "
        pageClassName="bg-semiDarkBlue w-12 text-center rounded-md font-outfitMedium hover:bg-white hover:text-primaryRed  "
        pageLinkClassName="block w-full  "
        activeClassName="activeClassName hover:bg-primaryRed hover:text-white"
        activeLinkClassName="w-full h-full"
      />
    </div>
  );
};

export default Pagination;
