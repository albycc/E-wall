import styles from "./MessageBox.module.scss"

export default function MessageBox({ textMessage="", messageType }) {
  return (
    <div className={`${styles["message-box"]} ${styles[messageType]}`}>
      <span>{textMessage}</span>
    </div>
  );
}
