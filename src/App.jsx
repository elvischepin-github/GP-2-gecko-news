import React, { useState } from "react";

import CoinContainer from "./components/coinContainer/coinContainer";
import CoinSearchBlock from "./components/coinSearchBlock/coinSearchBlock";
import NewsSearchBlock from "./components/newsSearchBlock/newsSearchBlock";
import NavBarContainer from "./components/navBarContainer/navBarContainer";
import NewsContainer from "./components/newsContainer/newsContainer";
import ThreeBlock from "./components/threeBlock/threeBlock";
// import ResizablePanel from "./components/resizablePanel/resizablePanel";

function App() {
  const [searchedCoin, setSearchedCoin] = useState("");
  const [searchedNews, setSearchedNews] = useState("");

  const handleCoinSearch = (coinValue) => {
    setSearchedCoin(coinValue);
  };

  const handleNewsSearch = (newsValue) => {
    setSearchedNews(newsValue);
  };

  return (
    <>
      <CoinSearchBlock onSearch={handleCoinSearch} />
      <NewsSearchBlock onSearch={handleNewsSearch} />
      <NavBarContainer />
      <ThreeBlock />
      <CoinContainer searchedCoin={searchedCoin} />
      <NewsContainer searchedNews={searchedNews} />
      {/* <ResizablePanel/> */}
    </>
  );
}

export default App;
