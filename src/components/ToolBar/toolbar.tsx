import styles from './toolbar.module.css'
import WalletIcon from '@mui/icons-material/Wallet';

const Toolbar = () => {

    return (
        <div className={styles.toolbarcontainer}>
            <div className='flex ml-2 mt-4'>
                <WalletIcon className={styles.walletIcon} fontSize='large' />
                <h2 className="ml-1 font-normal text-xl">Expense Manager</h2>
            </div>
        </div>
    )
}

export default Toolbar