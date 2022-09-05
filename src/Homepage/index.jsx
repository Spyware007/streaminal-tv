import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import Results from "../Results";
import COLORS from "../colors.js"

import styles from "./styles.module.scss";

export default function Homepage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const resultsParent = useRef();

    useEffect(() => {
        if (searchResults.length === 0)
            return;

        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }, [searchResults])


    async function getSearchResults(query) {
        try {
            let res = await fetch(
                `https://consumet-api.herokuapp.com/movies/flixhq/${query}`
            )
            res = await res.json();
            return res.results;
        }
        catch (e) {
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
    }

    return (
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
                            if (e.key === 'Enter') {
                                fetchData()
                            }
                        }}
                    />
                    <div className={styles.searchButton} onClick={fetchData}>
                        <FiSearch size={40} color={COLORS.darkBlack} />
                    </div>
                </div>
            </div>
            {searchResults.length > 0 && <div ref={resultsParent}>
                <Results results={searchResults} isLoading={isLoading} />
            </div>}
        </div>
    )
}
