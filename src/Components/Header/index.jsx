import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import styles from "./styles.module.scss";

export default function Header({ style }) {
    const navigate = useNavigate();

    return (
        <div className={styles.header} style={style}>
            <img src="/logo.png" alt="logo" className={styles.logo} onClick={() => { navigate("/") }} />
            <SearchBar onSearch={(q) => { navigate(`/search/${q}`); }} />
        </div>
    )
}