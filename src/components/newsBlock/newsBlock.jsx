import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import fetchNews from "./newsAPI";
import "./newsBlock.css";

function NewsBlock({ searchedNews }) {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const topic = "crypto";
  const filteredData = searchedNews ? searchedNews : topic;

  useEffect(() => {
    async function getApiData() {
      setLoading(true);
      try {
        const data = await fetchNews(filteredData);
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    }
    getApiData();
  }, [filteredData]);

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {newsData && newsData.articles && newsData.articles.length > 0
        ? newsData.articles
            .slice(0, 40)
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .map((article) =>
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
                      <button className="custom-button">
                        <a
                          target="_blank"
                          href={article.url}
                          className="news-link"
                          data-news
                        >
                          Source
                        </a>
                      </button>
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
