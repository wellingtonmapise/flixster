import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Watched from "./components/Watched";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SideBar />
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
