import styles from "./ticker.module.scss";

const TickerWrapper = ({ children, isRight = true }) => {
  return (
    <div className={styles.ticker_wrapper}>
      <div
        className={`${styles.ticker} ${
          isRight ? styles.ticker_right : styles.ticker_left
        }`}
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles.ticker_content}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerWrapper;