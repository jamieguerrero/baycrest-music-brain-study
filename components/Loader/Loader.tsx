import styles from "./Loader.module.css";
export function Loader({ show }: { show: boolean }) {
  return show ? <div className={styles.loader}></div> : null;
}
