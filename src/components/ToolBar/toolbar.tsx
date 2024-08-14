import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './toolbar.module.css'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

const Toolbar = () => {

    return (
        <div className={styles.toolbarcontainer}>
            <div className='flex ml-2 mt-4'>
                <FontAwesomeIcon className='mt-1' icon={faWallet} fontSize={20}/>
                <h2 className="ml-1 font-normal text-xl">Expense Manager</h2>
            </div>
        </div>
    )
}

export default Toolbar