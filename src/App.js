import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./routes/Coin";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import Contact from "./components/contact/Contact";

function App() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  useEffect(() => {
    // TODO: Add this into a separate function so that if it needs to be reused there 
    // is no need to repeat code
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        // console.log(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* TODO: Great react router structure here with also the nested routes */}
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={<Coins coins={coins} />} />
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />} />
        </Route>
      </Routes>
      <Contact />
      <Footer />
    </>
  );
}

export default App;
