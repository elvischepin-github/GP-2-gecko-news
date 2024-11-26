import BlockContainer from "./components/blockContainer";
import ThreeElement from "./components/threeElement";
import NavBar from "./components/navBar";

// const GeckoAPI = process.env.REACT_APP_GECKO_API;
// const url = `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${GeckoAPI}`;
// const options = { method: "GET", headers: { accept: "application/json" } };
// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));

function App() {
  return (
    <>
      <NavBar />
      <ThreeElement />
      <BlockContainer />
    </>
  );
}

export default App;
