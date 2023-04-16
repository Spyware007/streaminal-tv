import React from 'react';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Routes, Route } from "react-router-dom";

import Homepage from './Views/Homepage';
import MovieDetails from "./Views/MovieDetails";
import SearchResults from './Views/SearchResults';
import Header from './Components/Header';
import Footer from "./Components/Footer/index";


function App() {
  const [cookies, setCookie] = useCookies("recently_watched_id", { path: "/" });

  useEffect(() => {
    document.title = "Streaminal-TV";
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/watch" element={<MovieDetails />} />
        <Route exact path="/search/:query" element={<SearchResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
