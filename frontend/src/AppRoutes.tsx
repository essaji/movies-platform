import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DiscoverMovieRoute from "./routes/DiscoverMovieRoute";
import MovieDetailRoute from "./routes/MovieDetailRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiscoverMovieRoute />} />
        <Route path="/detail/:movieId" element={<MovieDetailRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
