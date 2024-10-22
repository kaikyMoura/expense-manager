import { getAllExpenses } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import SearchInput from '@/utils/SearchInput/searchInput';
import { faEye, faPenToSquare, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './expenses.module.css';

const Expenses = () => {

    const [expenses, setExpenses] = useState<IExpense[]>([])
    const [alert, setAlert] = useState(false)

    const fetchData = async () => {
        const data = await getAllExpenses()
        console.log(data)
        if (data.success === true) {
            setExpenses(data.data)
        }

    }

    useEffect(() => {

        fetchData()
    }, [])

    return (
        <>
            <div className={`items-center ${styles.container}`}>
                <div className='flex justify-between'>
                    <h2 className='font-semibold mt-4'>Expenses</h2>
                    <div className='flex gap-6'>
                        <FontAwesomeIcon className='cursor-pointer mt-3' icon={faRotateRight} height={20} onClick={fetchData} />
                        <SearchInput />
                        <Button type={'secondary'} text={'filter'} />
                        <Button type={'secondary'} text={'sort'} />
                    </div>
                </div>
                <div className='mt-6'>
                    <ul className='mt-2'>
                        {expenses && expenses.map(expense =>
                            <li key={expense?.id} className='flex items-center justify-between p-2 mt-1'>
                                <div className=''>
                                    {typeof expense.date === 'object' && dayjs.isDayjs(expense.date) ?
                                        <p className='font-medium text-lg'>Date: {expense.date.toString()}</p>
                                        :
                                        <p className='font-medium text-lg'>Date: {expense.date}</p>
                                    }
                                    <p className='flex items-center font-medium text-lg'>Name: {expense.name}</p>
                                    <p className='flex items-center font-medium text-lg'>Category: {expense.category.name}</p>
                                </div>
                                <div className='flex gap-4'>
                                    <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faPenToSquare} height={20} />
                                    <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faTrash} height={20} />
                                </div>
                            </li>
                        ).slice(0, 4)}
                        <div className={`mt-2 ${styles.line}`} />
                    </ul >
                </div>
            </div>
        </>
    )
}

export default Expenses;