import React from "react";
import styles from "./styles.module.scss";
import Results from "../Results/index";

const Slider = ({ title = "Title is empty", data = [] }) => {
  return (
    <>
      <div className={styles.sliderContainer}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.slider}>
          <div className={styles.slides}>
            <Results results={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
