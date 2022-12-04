import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import COLORS from "../../colors";

import styles from "./styles.module.scss";

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    return (
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
                            searchQuery.trim() !== "" && onSearch(searchQuery);
                        }
                    }}
                />
            </div>
            <div className={styles.searchButton} onClick={() => { searchQuery.trim() !== "" && onSearch(searchQuery) }}>
                <FiSearch color={COLORS.darkBlack} className={styles.searchIcon} />
            </div>
        </div>
    )
}