import { deleteExpense, getAllExpenses } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import { useLoadingContext } from '@/contexts/LoadingContext';
import SearchInput from '@/utils/SearchInput/searchInput';
import { faPenToSquare, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './expenses.module.css';
import Alert from '@/utils/Notification/notification';

const Expenses = () => {

    const { setLoading } = useLoadingContext()

    const [expenses, setExpenses] = useState<IExpense[]>([])
    const [text, setText] = useState()
    const [alert, setAlert] = useState(false)
    const [alertError, setAlertError] = useState(false)

    const fetchData = async () => {
        const data = await getAllExpenses()
        console.log(data)
        setLoading(true)
        if (data.success === true) {
            setLoading(false)
            setExpenses(data.data)
        }
        setLoading(false)

    }

    const remove = async (id: string | undefined) => {
        const response = await deleteExpense(id)
        if (response.success == true) {
            setAlert(true)
            setText(response.data)
        }
    }

    const close = () => {
        setAlert(false)
        setAlertError(false)
    }

    useEffect(() => {

        fetchData()
    }, [])

    return (
        <>
            <div className={`items-center ${styles.container}`}>
                <div className='flex justify-between'>
                    <h2 className='font-semibold mt-4 text-xl'>Expenses list</h2>
                    <div className='flex gap-6'>
                        <FontAwesomeIcon className='cursor-pointer mt-3' icon={faRotateRight} height={20} onClick={fetchData} />
                        <SearchInput />
                        <Button type={'secondary'} text={'filter'} />
                        <Button type={'secondary'} text={'sort'} />
                    </div>
                </div>
                <div className='mt-6'>
                    <table className='mt-2'>
                        <thead>
                            <tr className='flex justify-between items-center p-2 w-5/6'>
                                <th className='flex font-semibold text-lg w-1/5'>Name</th>
                                <th className='flex justify-start ml-6 font-semibold text-lg w-1/5'>Date</th>
                                <th className='flex font-semibold text-lg w-1/5'>Status</th>
                                <th className='flex font-semibold text-lg w-1/5'>Priority</th>
                                <th className='flex font-semibold text-lg w-1/5'>Category</th>
                            </tr>
                        </thead>
                            <div className={`mt-2 ${styles.line}`} />
                        <tbody>
                            {expenses && expenses.map(expense =>
                                <tr key={expense?.id} className='flex items-center justify-between p-2 w-6/6'>
                                    <td className='flex justify-start font-medium text-md w-1/6'>{expense.name}</td>
                                    <td className='flex justify-start font-medium text-lg w-1/6'>
                                        {typeof expense.date === 'object' && dayjs.isDayjs(expense.date) ?
                                            expense.date.toString() :
                                            expense.date}
                                    </td>
                                    <td className='flex justify-start font-semibold text-sm w-1/6'><p>{expense.status}</p></td>
                                    <td className='flex font-semibold text-sm w-1/6'><p>{expense.priority}</p></td>
                                    <td className='flex justify-start font-semibold text-sm w-1/6'>{expense.category.name}</td>
                                    <td className='flex justify-center gap-4 w-1/6'>
                                        <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faPenToSquare} height={20} />
                                        <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faTrash} height={20} onClick={()=> remove(expense?.id)}/>
                                    </td>
                                </tr>
                            ).slice(0, 4)}
                        </tbody>
                    </table >
                </div>
            </div>
            {alertError && <Alert type={'error'} title={'Error!'} text={text} Close={close} /> }
            {alert && <Alert type={'sucess'} title={'Sucess!'} text={text} Close={close} /> } 
        </>
    )
}

export default Expenses;