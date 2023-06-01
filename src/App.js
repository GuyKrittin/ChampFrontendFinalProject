import "./App.css";
import { HashRouter as Router, Switch, Route, Routes } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:slug" exact element={<Article />} />
        <Route path="/" element={<ArticleList />} />
        <Route path="/profiles/:username" exact element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
