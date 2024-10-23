import React from 'react';
import styles from './form.module.css'

interface FormProps {
    children: React.ReactNode[]
    action?: string;
    pages: number;
    currentPage: number | 0;
    title: string;
    className?: string;
    onPageChange?: (page: number) => void | unknown;
}

const Form = ({ action, children, className, currentPage, onPageChange, title }: FormProps) => {

    return (
        <>
            <form className={`${className} ${styles.formContainer}`} action={action}>
                <h2 className="font-medium text-xl">{title}</h2>
                {children[currentPage]}
            </form>
        </>
    )
}

export default Form;