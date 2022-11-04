import React from "react";
import MovieCard from "../MovieCard";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";


export default function Results({ results }) {
    return (
        <div className={styles.results}>
            {results.map((result) => {
                return (
                    <Link to={`/watch?id=${result.id}`} key={result.id}>
                        <MovieCard title={result.title} type={result.type} image={result.image} releaseDate={result.releaseDate} />
                    </Link>
                )
            })}
        </div>
    )
}
