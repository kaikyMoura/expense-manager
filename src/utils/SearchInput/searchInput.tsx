import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './searchinput.module.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'

const SearchInput = () => {
    return (
        <>
            <div className={`${styles.container}`}>
                <input className={`focus:outline-none ${styles.searchInput}`} placeholder="buscar..." />
                <button className={styles.searchButton}>
                    <FontAwesomeIcon className='ml-2' icon={faMagnifyingGlass} height={24}/>
                </button>
            </div>
        </>
    )
}

export default SearchInput;