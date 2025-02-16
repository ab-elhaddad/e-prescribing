import styles from './loadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={`${styles["lds-ring"]}`} >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
