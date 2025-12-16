import styles from "./ticker.module.scss";
const TickerWrapper = ({ isRight = true, children }) => {
    const textStyle = isRight ? styles.ticker_right : styles.ticker_left;
    return (
        <div className={styles.ticker_wrapper}>
            <div className={`${styles.ticker} ${textStyle}`}>
                <div className={styles.ticker_content}>
                    {children}
                </div>
                <span className={styles.ticker_content}>
                    {children}
                </span>
            </div>
        </div>
    )
}

export default TickerWrapper;