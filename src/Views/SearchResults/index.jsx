import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Results from "../../Components/Results";
import styles from "./styles.module.scss";


export default function SearchResults() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query } = useParams();

    async function getSearchResults(query) {
        try {
            let res = await fetch(
                `https://api.consumet.org/movies/flixhq/${query}`
            );
            res = await res.json();
            setResults(res.results);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    useEffect(() => {
        getSearchResults(query);
    }, [query])

    return (
        <div className="mainContainer">
            <Header />
            {
                isLoading
                    ?
                    <div className={styles.loader}>
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                    :
                    <div className={styles.results}>
                        <Results results={results} />
                    </div>
            }
        </div>
    )
}