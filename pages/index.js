import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [coinData, setCoinData] = useState([]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    fetchData(value);
  };

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
    <div className="flex flex-col">
      <h3 className="flex justify-center">Top Crypto Exchanges</h3>
      <h5 className="flex justify-center">
        Compare all 190 Top Crypto Exchanges. The list is ranked by top trading
        volume
      </h5>
      <ul className="flex justify-between px-4 py-2">
      <li className="list-none	 mx-4" >Exchanges</li>
      <li className="list-none	 mx-4" >24 hour trade volume</li>
      </ul>
      {coinData.map((e, i) => (
        <div className="flex justify-between px-4 py-2 hover:bg-gray-300 " key = {i}>
          <div className="flex justify-center px-4 py-2" >
            <li className="list-none	 mx-4" >{i + 1}</li>
            {e.url && <img src= {e.url} className="list-none	 mx-4" />}
            {e.name && <li className="list-none	 mx-4" >{e.name}</li>}
          </div>
          {e.volume_1day_usd && <li className="list-none mx-4	">$ {e.volume_1day_usd}</li>}
        </div>
      ))}
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
