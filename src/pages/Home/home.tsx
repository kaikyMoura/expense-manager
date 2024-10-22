//import { getAllExpenses } from '@/api/services/expenseService';
import { getAllExpenses, getExpensesCategories } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import Calendar from '@/components/CalenderDays/calender';
import Alert from '@/utils/Notification/notification';
import { faChevronRight, faEllipsisVertical, faEye, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './home.module.css';

const Home = () => {
    const [expenses, setExpenses] = useState<IExpense[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllExpenses()
            console.log(data)
            if (data.success === true) {
                setExpenses(data.data)
            }

            const response = await getExpensesCategories()
            if (response.success === true && response.data) {
                setCategories(response.data)
            }
        }
        fetchData()
    }, [])

    const Close = () => {
        setAlert(false)
    }

    return (
        <>
            <div className={`-mt-12 ${styles.container}`}>
                <div className={`-mt-16 ${styles.calender}`}>
                    <Calendar />
                </div>
                <div className={`-mt-16 ${styles.expenses}`}>
                    <div className='flex justify-between ml-6 mt-5'>
                        <h3 className='font-bold'>My Expenses ({expenses.length})</h3>
                        <FontAwesomeIcon className='mr-7' icon={faEllipsisVertical} height={20} />
                    </div>
                    <div className={`mt-3 relative ${styles.line}`} />

                    <ul className='mt-2'>
                        {expenses && expenses.map(expense =>
                            <li key={expense?.id} className='flex items-center p-2 mt-1'>
                                <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faEye} height={20} />
                                <Link className='flex justify-end' href={'/Expense/expenses'}>
                                    <p className='flex items-center font-medium text-lg'>{expense.name}</p>
                                    {typeof expense.date === 'object' && dayjs.isDayjs(expense.date) ?
                                        <p className='flex items-center ml-48 font-bold'>{expense.date.toString()}</p>
                                        :
                                        <p className='flex items-center justify-end ml-44 font-bold'>{expense.date}</p>
                                    }
                                </Link>
                            </li>
                        ).slice(0, 4)}
                        <div className={`mt-2 ${styles.line}`} />
                    </ul >

                    <Link className='flex justify-center mt-2' href={'/Expense/expenses'}>
                        <p>show more</p>
                    </Link>
                </div>
                <div className={`-mt-16 ${styles.analitics}`}>
                    <div>
                        <h3 className='flex justify-start mt-5 ml-4 font-bold'>Statistics</h3>
                        <div className={`mt-3 ${styles.line}`} />
                    </div>
                    <Link className='' href={'/Statistics/statistics'}>
                        <div className='flex justify-between'>
                            <p className='mt-3 flex justify-start mt-2 font-semibold text-sm ml-4'>Budget analysis</p>
                            <FontAwesomeIcon className='mt-4 mr-6' icon={faChevronRight} height={12} />
                        </div>

                        <p className='flex justify-start font-light text-xs ml-4'>Click to make an analyses...</p>
                    </Link>
                    <div className={`mt-7 ${styles.line}`} />

                    <Link href={'/Statistics/statistics'}>
                        <div className='flex justify-between'>
                            <p className='mt-3 flex justify-start mt-2 font-semibold text-sm ml-4'>Expense trends</p>
                            <FontAwesomeIcon className='mt-4 mr-6' icon={faChevronRight} height={12} />
                        </div>
                        <p className='flex justify-start font-light text-xs ml-4'>Click to make an analyses...</p>
                    </Link>
                    <div className={`mt-7 ${styles.line}`} />

                    <p className='flex justify-center font-light text-xs p-2'>Track other analyses with your expenses data...</p>
                    <div className='mt-1'>
                        <Button type={'secondary'} text={'Track'} />
                    </div>
                </div>
                <div className={`${styles.expensesCategories}`}>
                    <div >
                        <div className='mt-5 flex justify-start ml-4'>
                            <FontAwesomeIcon className='mt-0.5' icon={faTags} height={20} />
                            <h3 className='ml-2 font-bold'>Expenses categories</h3>
                        </div>
                        <div className={`mt-3 ${styles.line}`} />
                        <ul className='mt-1'>
                            {categories.map(category => (
                                <li key={category?.id} className='flex items-center justify-center p-2 mt-1'>
                                    <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faEye} height={20} />
                                    <Link className='flex justify-end' href={'/Expense/expenses'}>
                                        <p className='flex items-center font-medium text-lg'>{category.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className='mt-4'>
                            <Button type={'secondary'} text={'New'} action={() => setAlert(true)} />
                        </div>
                    </div>
                </div>
            </div >

            {alert ? <Alert type={'error'} title={'Error!'} text={"sdsdddddddddddsassssssssda"} Close={Close} /> : null}
        </>
    )
}

export default Home;