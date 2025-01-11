import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import "./newsBlock.css";

function NewsBlock() {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const NewsAPI = process.env.REACT_APP_NEWS_API;
  const url = `https://newsapi.org/v2/everything?q=crypto&apiKey=${NewsAPI}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  useEffect(() => {
    async function getApiData() {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setNewsData(data);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    }
    getApiData();
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {newsData && newsData.articles && newsData.articles.length > 0
        ? newsData.articles.slice(0, 40).map((article) =>
            article.title === "[Removed]" ? (
              (console.log("[Removed]"), null)
            ) : (
              <div className="newsBlock" key={uuid()}>
                <div className="newsContent">
                  <h2>{article.title}</h2>
                  <b>{article.author}</b>
                  <i>{new Date(article.publishedAt).toLocaleDateString()}</i>
                  <p>
                    {article.description ||
                      "We are sorry! There is no description available..."}
                  </p>
                  {article.url ? (
                    <a href={article.url} className="news-link" data-news>
                      Source
                    </a>
                  ) : (
                    <p>Ugh! There is no link available...</p>
                  )}
                  <br />
                </div>
                <div className="urlToImageContainter">
                  <img
                    src={article.urlToImage || "src/assets/no-image.jpg"}
                    alt="Possibly resource doesn't have an image..."
                  />
                </div>
              </div>
            )
          )
        : null}
    </>
  );
}

export default NewsBlock;
