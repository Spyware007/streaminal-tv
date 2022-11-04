import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import styles from "./styles.module.scss";

export default function Header() {
    const navigate = useNavigate();

    return (
        <SearchBar onSearch={(q) => { navigate(`/search/${q}`); }} />
    )
}