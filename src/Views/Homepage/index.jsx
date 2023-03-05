import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "../../Components/Header"
import Slider from "../../Components/Slider";
import Utilities from "../../Utilities";

import styles from "./styles.module.scss";

export default function Homepage() {
    const [cookies] = useCookies("recently_watched_id", { path: "/" });
    const [trendingMoviesData, setTrendingMoviesData] = useState([]);
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [latestTvShows, setLatestTvShows] = useState([]);
    const [recentlyWatched, setRecentlyWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getTrendingMoviesData();
        getTrendingTvShows();
        getLatestMovies();
        getLatestTvShows();
    }, []);

    useEffect(() => {
        console.log(window.localStorage.getItem("id"));
    }, [])

    async function getTrendingMoviesData() {
        try {
            let res = await fetch(
                `https://streaminal-api.onrender.com/get-trending-movies`
            );
            res = await res.json();
            setTrendingMoviesData(res.trendingMovies);
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
            setTrendingTvShows(res.trendingTvShows);
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
            setLatestMovies(res.latestMovies);
        } catch (e) {
            console.log(e);
        }
    }

    async function getLatestTvShows() {
        try {
            let res = await fetch(
                `https://streaminal-api.onrender.com/get-latest-tv-shows`
            );
            res = await res.json();
            setLatestTvShows(res.latestTvShows);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="mainContainer">
            <div className={styles.homepage}>
                <Header />
                {
                    isLoading ?
                        <div className={styles.loader}>
                            <div className="lds-ripple"><div></div><div></div></div>
                        </div> :
                        <>
                            <Slider title="Recently Watched" data={recentlyWatched} />
                            <Slider title="Trending Movies" data={trendingMoviesData} />
                            <Slider title="Trending TV Shows" data={trendingTvShows} />
                            <Slider title="Latest Movies" data={latestMovies} />
                            <Slider title="Latest TV Shows" data={latestTvShows} />
                        </>
                }
            </div>
        </div>
    );
}
