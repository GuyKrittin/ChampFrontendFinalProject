import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const url = new URL(`http://localhost:3000/api/articles/${slug}`);
        // Add more query parameters as needed

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        setArticle(data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article");
      }
    };

    fetchArticle();
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="info ">
        <Link to={`/profiles/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
      </div>
      <div>
        <span className="date">{article.createdAt.slice(0, -14)}</span>
        <div>
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-plus-round" />
            &nbsp; Follow
          </button>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <div className="container">
        <h1>{article.title}</h1>
        <div className="container border">
          <p>{article.body}</p>
        </div>
      </div>
    </>
  );
};

export default Article;
