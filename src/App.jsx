import "./App.css";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Watched from "./components/Watched";
import TopNav from "./components/TopNav";

const App = () => {
  return (
    <Router>
      <div className="app">
        <TopNav />
        <div className="main-page">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watched" element={<Watched />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
