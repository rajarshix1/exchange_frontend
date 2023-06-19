import Pagination from '../components/pagination';
import { useState } from 'react';

export default function Home() {
  const totalPages = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };

  const fetchData = (pageNumber) => {
    ///// for axios call 
  };

  return (
    <div className='flex flex-col'>
      <h3 className='flex justify-center'>Top Crypto Exchanges</h3>
      <h5 className='flex justify-center'>Compare all 190 Top Crypto Exchanges. The list is ranked by top trading volume</h5>

     {Array.from({ length: totalPages }, (_, index) => (
         <div className= "flex justify-center px-4 py-2 hover:bg-gray-300">
           <li className="list-none	 mx-4"
            key={index}>
           {index+1}
          </li>
          <li className="list-none mx-4	"> ... </li>
         </div>
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
