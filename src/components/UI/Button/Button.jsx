
import styles from "./Button.module.scss"

export default function Button({text, func}){
    return <button onClick={func} className={styles["button"]}>{text}</button>
}