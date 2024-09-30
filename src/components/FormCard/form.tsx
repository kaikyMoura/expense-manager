import React from 'react';
import styles from './form.module.css'

interface FormProps {
    children: React.ReactNode[]
    action?: string
    pages: number | any;
    currentPage: number | any;
    title: string
    onPageChange: (page: number) => void | any;
}

const Form = ({ action, children, pages, currentPage, onPageChange, title }: FormProps) => {

    // const handlePageChange = (page: number) => {
    //     if (page >= 0 && page <= pages) {
    //         onPageChange(page);
    //     }
    // };

    // const renderPageNumbers = () => {
    //     const pageNumbers = [];
    //     for (let i = 0; i <= pages; i++) {
    //         pageNumbers.push(
    //             <li
    //                 key={i}
    //                 className={i === pages ? 'active' : ''}
    //                 onClick={() => handlePageChange(i)}
    //             >
    //                 {i}
    //             </li>
    //         );
    //     }
    //     return pageNumbers;
    // };

    return (
        <>
            <form className={styles.formContainer} action={action}>
                <h2 className="font-medium text-xl">{title}</h2>
                {children[currentPage]}
            </form>
        </>
    )
}

export default Form;