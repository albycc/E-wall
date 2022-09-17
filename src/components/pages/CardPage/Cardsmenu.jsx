import styles from "./Cardsmenu.module.scss"

export default function Cardsmenu({cords, activeFunction, deleteFunction}){

    const activeButtonHandler = () => {
        console.log("active card");
        activeFunction()
    }

    const deleteButtonHandler = () => {
        console.log("delete card");
        deleteFunction()
    }
    return <div className={styles["menu-container"]} style={cords}>
        <button className={styles["circle-button"]} onClick={activeButtonHandler}>SET ACTIVE</button>
        <button className={styles["circle-button"]} onClick={deleteButtonHandler}>DELETE CARD</button>
    </div>
}