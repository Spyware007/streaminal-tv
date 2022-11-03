import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Results from "../Results";
import COLORS from "../colors.js";

import styles from "./styles.module.scss";
import Slider from "../Slider";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const resultsParent = useRef();

  useEffect(() => {
    getTrendingMoviesData();
    getTrendingTvShows();
    getLatestMovies();
    getLatestTvShows();

    if (searchResults.length === 0) return;
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, [searchResults]);

  async function getSearchResults(query) {
    try {
      let res = await fetch(
        `https://consumet-api.herokuapp.com/movies/flixhq/${query}`
      );
      res = await res.json();
      return res.results;
    } catch (e) {
      console.log(e);
    }
  }

  async function getTrendingMoviesData() {
    try {
      let res = await fetch(
        `https://streaminal-api.onrender.com/get-trending-movies`
      );
      res = await res.json();
      console.log(res);
      setTrendingMoviesData(res.trendingMovies);
      return res.trendingMovies;
    } catch (e) {
      console.log(e);
    }
  }
  async function getTrendingTvShows() {
    try {
      let res = await fetch(
        `https://streaminal-api.onrender.com/get-trending-tv-shows`
      );
      res = await res.json();
      console.log(res);
      setTrendingTvShows(res.trendingTvShows);
      return res.trendingTvShows;
    } catch (e) {
      console.log(e);
    }
  }
  async function getLatestMovies() {
    try {
      let res = await fetch(
        `https://streaminal-api.onrender.com/get-latest-movies`
      );
      res = await res.json();
      console.log(res);
      setLatestMovies(res.latestMovies);
      return res.latestMovies;
    } catch (e) {
      console.log(e);

    async function getSearchResults(query) {
        try {
            let res = await fetch(
                `https://api.consumet.org/movies/flixhq/${query}`
            )
            res = await res.json();
            return res.results;
        }
        catch (e) {
            console.log(e);
        }
    }
  }
  async function getLatestTvShows() {
    try {
      let res = await fetch(
        `https://streaminal-api.onrender.com/get-latest-tv-shows`
      );
      res = await res.json();
      console.log(res);
      setLatestTvShows(res.latestTvShows);
      return res.latestTvShows;
    } catch (e) {
      console.log(e);
    }
  }

  const fetchData = async () => {
    if (searchQuery) {
      setIsLoading(true);

      let res = await getSearchResults(searchQuery);

      setSearchResults(res.slice(0, 10));
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.homepage}>
        <div className={styles.searchbarDiv}>
          <div className={styles.searchbar}>
            <input
              type="search"
              name="searchbar"
              placeholder="Movies, TV shows, anime..."
              id={styles.searchbarInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
            />
            <div className={styles.searchButton} onClick={fetchData}>
              <FiSearch size={40} color={COLORS.darkBlack} />
            </div>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div ref={resultsParent}>
          <Results results={searchResults} isLoading={isLoading} />
        </div>
      )}
      {/* <div> */}
      <Slider title="Trending Movies" data={trendingMoviesData} />
      <Slider title="Trending Tv Shows" data={trendingTvShows} />
      <Slider title="Latest Movies" data={latestMovies} />
      <Slider title="Latest Tv Shows" data={latestTvShows} />
      {/* </div> */}
    </>
  );
}
