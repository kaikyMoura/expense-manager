import { getAllExpenses } from '@/api/services/expenseService';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import Calendar from '@/components/CalenderDays/calender';

const Home = () => {
    const [expenses, setExpenses] = useState<IExpense[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllExpenses()
            setExpenses(data)
        }
        fetchData()
    }, [expenses])

    return (
        <>
            <div className={styles.container}>
                <div className={`-mt-16 ${styles.calender}`}>
                    <Calendar />
                </div>
                <div className={`-mt-16 ${styles.expenses}`}>
                    <div className='flex justify-between ml-6 mt-5'>
                        <h3 className='font-bold'>My Expenses ({expenses.length})</h3>
                        <FontAwesomeIcon className='mr-7' icon={faEllipsisVertical} fontSize={20} />
                    </div>
                    <div className={`mt-3 relative ${styles.line}`} />
                    {expenses.map(expense =>
                        <>
                            <ul className='mt-2'>
                                <li key={expense?.id} className='flex gap-2'>
                                    <Checkbox color='default' size='medium' sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'white'
                                        },
                                    }} checked={true} onClick={() => console.log('fdsds')} />
                                    <Link className='flex' href={'/Expense/expenses'}>
                                        <p className='flex items-center font-medium text-lg'>{expense.name}</p>
                                        <p className='flex items-center ml-52 font-bold'>{expense.date}</p>
                                    </Link>
                                </li>
                                <div className={`mt-2 ${styles.line}`} />
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;