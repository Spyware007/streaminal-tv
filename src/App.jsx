import React from 'react';
import Homepage from './Homepage';
import MovieDetails from './MovieDetails';

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/watch" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
