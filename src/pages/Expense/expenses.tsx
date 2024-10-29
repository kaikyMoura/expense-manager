import { deleteExpense, getAllExpenses } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import Modal from '@/components/Modal/modal';
import { useLoadingContext } from '@/contexts/LoadingContext';
import Alert from '@/utils/Notification/notification';
import SearchInput from '@/utils/SearchInput/searchInput';
import { faPenToSquare, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './expenses.module.css';

const Expenses = () => {
    const { setLoading } = useLoadingContext()

    const [expenses, setExpenses] = useState<IExpense[]>([])
    const [text, setText] = useState()
    const [alert, setAlert] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [filter, setFilter] = useState<any>()
    const [options, setOptions] = useState<any[]>([])

    const fetchData = async () => {
        const data = await getAllExpenses()
        console.log(data)
        setLoading(true)
        if (data.success === true) {
            setLoading(false)
            setExpenses(data.data)
        }
        else {
            console.log(data.error)
        }
        setLoading(false)

    }

    const openOptions = (option: String) => {
        switch (option) {
            case "Date":
                setOptions([{ name: "Recente" }, { name: "Distante" }, { name: "Hoje" }, { name: "Mês especifico" }])
                break;
        }
    }

    const remove = async (id: string | undefined) => {
        const response = await deleteExpense(id)
        if (response.success == true) {
            setAlert(true)
            setText(response.data)
            fetchData()
        }
    }

    const close = () => {
        setAlert(false)
        setAlertError(false)
        setOpenModal(false)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const filterByDate = async () => {
        const response = await getAllExpenses()
        const recent = response.data
            .slice() // Faz uma cópia do array original para evitar mutação
            .sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Ordena pela data mais recente
            .filter((expense: IExpense) => new Date(expense.date).getTime() === new Date(expenses[0].date).getTime())
        setFilter(recent)
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
                        <SearchInput popular={expenses} onSearch={(event: any) => {
                            if (event == '' || event == null) {
                                fetchData()
                            }
                            else {
                                setExpenses(event)
                            }
                        }} keys={["name", "category", "status"]}
                            search={fetchData} />
                        <Button type={'secondary'} text={'filter'} action={handleOpenModal} />
                        <Button type={'secondary'} text={'sort'} />
                    </div>
                </div>
                <div className='mt-6'>
                    {expenses.length > 0 ?
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
                                    <tr key={expense?.id} className={`flex items-center justify-between p-2 w-6/6 ${styles.tbRow}`}>
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
                                            <FontAwesomeIcon className='mr-4 cursor-pointer' icon={faTrash} height={20} onClick={() => remove(expense?.id)} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table >
                        : <div className='mt-40'><p className='text-lg'>You haven´t created any expenses yet.</p></div>
                    }
                </div>
            </div>
            {alertError && <Alert type={'error'} title={'Error!'} text={text} Close={close} />}
            {alert && <Alert type={'sucess'} title={'Sucess!'} text={text} Close={close} />}
            {openModal ?
                <Modal classname='w-[32em] h-[26em]' Close={close}>
                    <div>
                        <div className='relative top-[6%]'>
                            <div className='flex'>
                                <h3 className='font-bold text-lg'>Filter by</h3>
                            </div>
                            <div className='flex mt-2 gap-4'>
                                <Button type={'secondary'} text={'Date'} action={() => openOptions("Date")} />
                                <Button type={'secondary'} text={'Status'} action={handleOpenModal} />
                                <Button type={'secondary'} text={'Priority'} action={handleOpenModal} />
                                <Button type={'secondary'} text={'Category'} action={handleOpenModal} />
                            </div>
                            <div className={`mt-5 ${styles.line}`} />
                            <ul className='flex justify-between'>
                                {options && options.map((opt) => (
                                    <li key={""} >
                                        <p>{opt.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex absolute bottom-[3%]'>
                            <Button className='p-2' type={'primary'} text={'Apply filter'} action={handleOpenModal} />
                        </div>
                    </div>
                </Modal >
                : null
            }
        </>
    )
}

export default Expenses;