import React from 'react';
import styles from './form.module.css'

interface FormProps {
    children: React.ReactNode[]
    action?: string
    pages: number;
    currentPage: number | 0;
    title: string
    onPageChange: (page: number) => void | unknown;
}

const Form = ({ action, children, pages, currentPage, onPageChange, title }: FormProps) => {

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