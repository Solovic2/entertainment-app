import ReactPaginate from "react-paginate";
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
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        marginPagesDisplayed={1}
        className="mt-5 flex items-center justify-center gap-5 text-white"
        pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium "
        activeClassName="activeClassName"
        activeLinkClassName="w-full h-full"
      />
    </div>
  );
};

export default Pagination;
