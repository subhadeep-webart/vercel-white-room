"use client";

import { useEffect, useRef } from "react";
import styles from "./ticker.module.scss";

const TickerWrapper = ({ children, isRight = false, speed = 100 }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const firstGroup = el.children[0];
    if (!firstGroup) return;

    const width = firstGroup.offsetWidth;

    // duration = distance / speed
    const duration = width / speed;

    el.style.setProperty("--move", `${width}px`);
    el.style.setProperty("--duration", `${duration}s`);
  }, [children, speed]);

  return (
    <div className={styles.ticker_wrapper}>
      <div
        ref={trackRef}
        className={`${styles.ticker} ${
          isRight ? styles.ticker_right : styles.ticker_left
        }`}
      >
        {/* ORIGINAL */}
        <div className={styles.ticker_group}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.ticker_content}>
              {children}
            </div>
          ))}
        </div>

        {/* DUPLICATE (important for seamless loop) */}
        <div className={styles.ticker_group}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.ticker_content}>
              {children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TickerWrapper;