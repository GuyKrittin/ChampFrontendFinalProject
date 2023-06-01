import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = new URL("http://localhost:3000/api/articles");
        url.searchParams.append("limit", "3"); // Default limit is set to 3, you can adjust this value if needed
        // Add more query parameters as needed, e.g., url.searchParams.append('tag', 'your-tag');

        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <div className="container page">
        <div className="row">
          <div className="home-page">
            <div className="banner">
              <div className="container">
                <h1 className="logo-font d-flex align-items-center justify-content-center">
                  conduit
                </h1>
                <p>A place to share your knowledge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          <div className="col-md-9">
            <div className="article-list ">
              {articles.map((article) => (
                <div className="article-preview">
                  <div className="article-meta border">
                    <div className="info ">
                      <Link
                        to={`/profiles/${article.author.username}`}
                        className="author"
                      >
                        {article.author.username}
                      </Link>
                      <span className="date">
                        {article.createdAt.slice(0, -14)}
                      </span>
                      <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart" /> {article.favoritesCount}
                      </button>
                    </div>
                  </div>
                  <Link
                    to={`/${article.slug}`}
                    key={article.slug}
                    className="container"
                  >
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
