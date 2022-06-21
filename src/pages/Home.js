import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch ] = useState("");
  useEffect(() => {
    fetchCoins();
  },[]);
  const fetchCoins = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    setCoins(response.data);
    setLoading(false);
  };
    const handleSearch = (e) => {
        e.preventDefault()
        const filtered = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
        setCoins(filtered)

    }
  return (
    <>
    
    <input type="text" className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search any coin..."  />
    <button onClick={handleSearch}>Search</button>
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Crypto Currency (symbol)</TableCell>
            <TableCell align="right">($)Current Price</TableCell>
            <TableCell align="right">($)Marketcap</TableCell>
            <TableCell align="right">All time high</TableCell>
            <TableCell align="right">Circulating/total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={coin.image} alt="" className="logo" /> {coin.name} (
                {coin.symbol})
              </TableCell>
              <TableCell align="right">{coin.current_price}</TableCell>
              <TableCell align="right">{coin.market_cap}</TableCell>
              <TableCell align="right">{coin.ath}</TableCell>
              {((coin.circulating_supply / coin.max_supply) * 100).toFixed(
                2
              ) !== "Infinity" && (
                <TableCell align="right">
                  {((coin.circulating_supply / coin.max_supply) * 100).toFixed(
                    2
                  )}
                  %
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
