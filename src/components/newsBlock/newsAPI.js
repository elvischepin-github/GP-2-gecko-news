const fetchNews = async (searchQuery) => {
  try {
    const response = await fetch(`/api/news?q=${searchQuery}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export default fetchNews;
