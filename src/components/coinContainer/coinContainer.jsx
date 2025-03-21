import CoinBlock from "../coinBlock/coinBlock";
import { useEffect, useState, useRef } from "react";
import "./coinContainer.css";

function CoinContainer({ searchedCoin }) {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GeckoAPI = process.env.REACT_APP_GECKO_API;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&x_cg_demo_api_key=${GeckoAPI}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  useEffect(() => {
    async function getApiData() {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const filteredData = searchedCoin
          ? data.filter(
              (coin) =>
                coin.name.toLowerCase().includes(searchedCoin.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchedCoin.toLowerCase())
            )
          : data;
        setCoinData(filteredData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    }

    getApiData();

    const intervalId = setInterval(getApiData, 60000);

    return () => clearInterval(intervalId);
  }, [url, options, searchedCoin]);

  const scrollContainerRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      e.stopPropagation();

      scrollContainerRef.current.scrollLeft += e.deltaY * 6;
    }
  };

  const inside = (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  };
  const outside = (e) => {
    e.preventDefault();
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
  };

  if (loading)
    return (
      <div className="coinContainer widthFix">
        {[...Array(12)].map((_, i) => (
          <div className="coinBlock coinLoaderPosition" key={i}>
            <div className="coinLoader"></div>
          </div>
        ))}
      </div>
    );
  if (error) return <div className="coinError"></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="custom-shape-divider-top-1736977775">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onMouseEnter={inside}
        onMouseLeave={outside}
        className="coinContainer"
      >
        {coinData.map((coin) => (
          <CoinBlock key={coin.id} data={coin} />
        ))}
      </div>
    </>
  );
}

export default CoinContainer;
