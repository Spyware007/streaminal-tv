import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import NetPlayer from "netplayer";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import styles from "./styles.module.scss";
import accordionStyles from "./accordionStyles.module.scss";
import Header from "../../Components/Header";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function renameKey(object, oldKey, newKey) {
    if (oldKey !== newKey) {
        Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey));
        delete object[oldKey];
    }
}

async function getMovieDetails(id) {
    try {
        let res = await fetch(`https://api.consumet.org/movies/flixhq/info?id=${id}`);
        res = await res.json()
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function getStreamURLS(episodeId, mediaId, server) {
    try {
        let res = await fetch(`https://api.consumet.org/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}&server=upcloud`);
        res = await res.json()
        return res;
    } catch (e) {
        console.log(e);
    }
}

function cleanStreamData(streamData) {
    streamData.sources.map(function (item) {
        delete item.isM3U8;
        return item;
    });

    streamData.sources.forEach((obj) => {
        renameKey(obj, "url", "file");
        renameKey(obj, "quality", "label");
    });

    streamData.subtitles.forEach((obj) => {
        renameKey(obj, "url", "file");
        renameKey(obj, "lang", "language");
        obj["lang"] = obj["language"];
    });
}

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({});
    const [streamData, setStreamData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [episode, setEpisode] = useState({});
    const [seasonData, setSeasonData] = useState({});
    const query = useQuery();

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    useEffect(() => {
        async function fetchData() {
            let movieDetails = await getMovieDetails(query.get("id"));
            setMovieDetails(movieDetails, setEpisode(movieDetails.episodes[0]));


            let episodes = movieDetails.episodes;
            let seasonDataObj = {};
            for (let index = 0; index < episodes.length; index++) {
                const episode = episodes[index];

                if (episode.season in seasonDataObj) {
                    seasonDataObj[episode.season].push(episode);
                }
                else {
                    seasonDataObj[episode.season] = [episode];
                }
            }
            setSeasonData(seasonDataObj);
        }
        fetchData();
    }, [query]);

    useEffect(() => {
        if (Object.keys(episode).length === 0)
            return

        async function changeEpisode() {
            let streamDataObj = await getStreamURLS(episode.id, query.get("id"));
            cleanStreamData(streamDataObj);
            setStreamData(streamDataObj, setIsLoading(false));
        }
        changeEpisode();
    }, [episode, query])

    return (
        <div className={styles.mainDiv}>
            <Header style={{ padding: "0 20px" }} />
            <div className={styles.movieDetails}>
                {isLoading
                    ?
                    <div className={styles.loader}>
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div> :
                    <>
                        <div className={styles.videoDiv}>
                            <NetPlayer
                                sources={streamData.sources}
                                subtitles={streamData.subtitles}
                                hlsConfig={{
                                    maxLoadingDelay: 4,
                                    minAutoBitrate: 0,
                                    lowLatencyMode: true,
                                }}
                                autoPlay={true}
                            />
                        </div>

                        <div className={styles.infoAndSeasons}>

                            <div className={styles.detailsCard}>
                                <img
                                    src={movieDetails.image}
                                    className={styles.movieImage}
                                    alt={movieDetails.title}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "/logo512.png";
                                    }}
                                />
                                <div className={styles.otherDetails}>
                                    <div className={styles.movieTitle}>
                                        {movieDetails.title}
                                    </div>
                                    <div className={styles.ratingAndDuration}>
                                        <div className={styles.rating}>
                                            <AiOutlineStar size={20} />
                                            {movieDetails.rating}
                                        </div>
                                        <div className={styles.duration}>{movieDetails.duration}</div>
                                    </div>
                                    <div className={styles.production}>{movieDetails.production}</div>
                                    <div className={styles.releaseDate}>{movieDetails.releaseDate}</div>
                                    <div className={styles.genres}>
                                        {
                                            movieDetails.genres ?
                                                movieDetails.genres.map((genre) => {
                                                    return (<div className={styles.tag} key={genre}>{genre}</div>)
                                                }) :
                                                ""
                                        }
                                    </div>
                                    <b>Starring: </b>
                                    <div className={styles.cast}>
                                        {
                                            movieDetails.casts ?
                                                movieDetails.casts.map((actor) => {
                                                    return (<div className={styles.actor} key={actor}>{actor}</div>)
                                                }) :
                                                ""
                                        }
                                    </div>
                                </div>
                            </div>

                            {movieDetails.type === "TV Series" ?
                                <div className={styles.rightDiv}>
                                    <div className={styles.episodeTitle}>
                                        Now playing: S{episode.season} E{episode.number}: {episode.title}
                                    </div>
                                    <div className={styles.seasonsList}>
                                        <Accordion allowZeroExpanded={true} className={accordionStyles.accordion}>
                                            {
                                                Object.keys(seasonData).map((season) => {
                                                    return (
                                                        <AccordionItem className={accordionStyles.accordion__item} key={season}>
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton className={accordionStyles.accordion__button}>
                                                                    Season {season}
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <div className={styles.episodesList}>
                                                                {seasonData[season].map((ep) => {
                                                                    return (
                                                                        <AccordionItemPanel
                                                                            className={accordionStyles.accordion__panel}
                                                                            key={ep.id}>
                                                                            <div
                                                                                className={`${styles.episode} ${ep.id === episode.id ? styles.activeEpisode : ""}`}
                                                                                onClick={() => {
                                                                                    setEpisode(ep)
                                                                                }}
                                                                            >
                                                                                {`Episode ${ep.number}`}
                                                                            </div>
                                                                        </AccordionItemPanel>
                                                                    )
                                                                })}
                                                            </div>
                                                        </AccordionItem>

                                                    )
                                                })
                                            }
                                        </Accordion>
                                    </div>
                                </div> : ""
                            }
                        </div>
                    </>}
            </div>
        </div>
    )
}