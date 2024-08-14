import styles from './loading.module.css'

const Loading = () => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}>
                <span></span>
            </div>
        </div>
    )
}

export default Loading;