
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
  
      <ul className="flex list-none justify-center m-0 p-0">
        <li
          className={`mr-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a className="inline-block px-4 py-2">
            Previous
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`mr-2 ${
              currentPage === index + 1
                ? "font-bold text-blue-600"
                : "opacity-75"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            <a className="inline-block px-4 py-2">
              {index + 1}
            </a>
          </li>
        ))}

        <li
          className={`mr-2 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
