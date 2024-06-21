import { useState, useEffect } from "react";
import NewsBlock from "./comp/NewsBlock/NewsBlock";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./comp/Pagination/Pagination";
import { selectCategory } from "./redux/reducer/category";
import './fetchData.css'
const Fetch = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsData(data);
        console.log(newsData.articles[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }
  const categories = ["health", "business", "technology", "entertainment"];

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsData.articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleCategoryChange = (e) => {
    dispatch(selectCategory(e.target.value))
    setCurrentPage(1); 
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="mainpage">
      <div className="category-filter">
        <label htmlFor="category">Choose a category: </label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="fetch">
        {currentArticles.map((news, index) => {
          return (
            <NewsBlock
              key={index}
              imageurl={news.urlToImage}
              title={news.title}
              summary={news.description}
              viewmore={news.url}
            />
          );
        })}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={newsData.articles.length}
        paginate={paginate}
      />
    </div>
  );
};
export default Fetch;
