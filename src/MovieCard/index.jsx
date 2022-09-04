import React from "react";

import styles from "./styles.module.scss";

export default function MovieCard({ title, type, image, releaseDate }) {
    return (
        <div className={styles.movieCard}>
            <img
                src={image}
                className={styles.movieImage}
                alt={title}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/logo512.png";
                }}
            />
            <div className={styles.movieTitle}>{title}</div>
            <div className={styles.tag}>{type}</div>
            <div className={styles.movieReleaseDate}>{releaseDate}</div>
        </div>
    )
}