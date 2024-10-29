import { ReactNode, useState } from 'react';
import styles from './modal.module.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
    classname?: string;
    children: ReactNode;
    Close: Function | any
}

const Modal = ({ classname, children, Close }: ModalProps) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className={styles.blur} onClick={Close}>
            <div className={`${classname} ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon className='absolute top-[5%] left-[92%] cursor-pointer' icon={faX} height={20} onClick={Close} />
                {children}
            </div>
        </div>
    )
}

export default Modal;