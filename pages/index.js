import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [coinData, setCoinData] = useState([]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const handleSearchChange= async(e)=>{
    setSearchText(e)
    console.log(e);
  }

  const handleSearch = async () =>{
    if(searchText.length>1){
      const data = await axios.get(
        `http://localhost:3010/search?text=${searchText}`
      );
      console.log(data.data)
      setCoinData(data.data);
    }
    else{
      fetchData(1);
    }
  }

  const fetchData = async (pageNumber) => {
    const data = await axios.get(
      `http://localhost:3010/coins?page=${pageNumber}`
    );
    !totalPages && setTotalPages(data.data.totalPages);
    console.log(data.data);
    setCoinData(data.data.coins);
  };
  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="mx-auto max-w-xl">
      
      <h3 className="text-center text-2xl font-semibold mb-4">
        Top Crypto Exchanges
      </h3>
      <h5 className="text-center text-gray-600 mb-4">
        Compare all 190 Top Crypto Exchanges. The list is ranked by top trading
        volume
      </h5>
      <h4 className="text-center text-gray-600 mb-4">Exchanges</h4>
      <div className="flex justify-center">
      <input
                type="text"
                // value={searchTerm}
                onChange={(e)=>handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ml-2"
              >
                Search
              </button>
        </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className=" left-0 px-1 py-1">Exchanges</th>
            <th className="px-1 py-1">24 hour trade volume</th>
          </tr>
        </thead>
        <tbody>
        
          {coinData.map((e, i) => (
            <tr className="hover:bg-gray-100" key={i}>
              <td className="px-4 py-2 flex items-center">
                <span className="font-medium mr-2">{i + 1}</span>
                {e.url && (
                  <img src={e.url} className="w-6 h-6 rounded-full" alt="" />
                )}
                {e.name && <span className="ml-2">{e.name}</span>}
              </td>
              <td className="px-4 py-2">${e.volume_1day_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        className={"pagination"}
        style={{
          marginBottom: "30px",
        }}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
