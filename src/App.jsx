import React from 'react';
import Homepage from './Views/Homepage';
import MovieDetails from "./Views/MovieDetails";

import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import SearchResults from './Views/SearchResults';


function App() {
  useEffect(() => {
    document.title = "Streaminal-TV";
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/watch" element={<MovieDetails />} />
        <Route exact path="/search/:query" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
