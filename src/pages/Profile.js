import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profiles/${username}`
        );
        const data = await response.json();
        setProfile(data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles?author=${username}`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchProfile();
    fetchArticles();
  }, [username]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container">
      <h2>{profile.username}</h2>
      <img src={"placeholder.png"} className="user-img" />
      <p>Bio: {profile.bio}</p>
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-plus-round" />
        &nbsp; Follow
      </button>
      <h3>Articles by this author</h3>
      <div className="container">
        {articles.map((article) => (
          <div key={article.slug}>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart" /> {article.favoritesCount}
            </button>
            <Link
              to={`/${article.slug}`}
              key={article.slug}
              className="container"
            >
              <h4>{article.title}</h4>
              <p>{article.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
