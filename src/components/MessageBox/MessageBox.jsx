import styles from "./MessageBox.module.scss";
import { Fragment } from "react";
import { useSelector } from "react-redux";


export default function MessageBox () {
  const message = useSelector(state => state.textMessage);

  return (
    <Fragment>
      {message.visible && (
        <div className={`${styles["message-box"]} ${styles[message.messageType]}`}>
          <span>{message.messageText}</span>
        </div>
      )}
    </Fragment>
  );
}

