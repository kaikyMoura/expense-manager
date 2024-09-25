import { addExpense, getExpensesCategories } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import Input from '@/components/Input/input';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { SetStateAction, useEffect, useState } from 'react';
import styles from './expenseModal.module.css';

interface AlertProps {
    Close?: Function | any,
    action?: () => void
}

const ExpenseModal = ({ Close }: AlertProps) => {

    const [id, setId] = useState(Number)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [currency, setCurrency] = useState("")
    const [isrecurring, setIsrecurring] = useState(Boolean)
    const [priority, setPriority] = useState('')
    const [amount, setAmount] = useState(Number)
    const [date, setDate] = useState<Dayjs | string>(dayjs())

    const [categories, setCategories] = useState<Category[]>([])

    const newExpense = async () => {
        setId((prevQuantity: any) => ({
            ...prevQuantity,
            [id]: (prevQuantity[id] || 0) + 1,
        }))
        const expense: IExpense = {
            name: name,
            description: description,
            amount: amount,
            date: date,
            category: {
                name: category
            },
            currency: currency,
            isRecurring: isrecurring,
            attachments: [],
            priority: priority
        }


        await addExpense(expense).then(() =>
            //router.reload()
            console.log(expense)
        ).catch((erro: any) => {
            console.error("Erro: ", erro)
        })
    }

    const handleDate = (newDate: Dayjs | null) => {
        console.log(dayjs(newDate).format('YYYY-MM-DD'))
        const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
        setDate(formattedDate)
    }

    useEffect(() => {
        const fetchData = async () => {
            setCategories(await getExpensesCategories())
        }
        fetchData()
    }, [])

    return (
        <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={Close} className={`${styles.closeButton}`}>
                <FontAwesomeIcon icon={faX} fontSize={20} />
            </button>
            <form className={`${styles.modalContainer} w-full`}>
                <div className='flex justify-center mt-4 ml-2'>
                    <h2 className="text-2xl font-medium">Add expense</h2>
                </div>
                <div className='flex flex-wrap gap-6 bg-gray-500'>
                    <div>
                        <Input placeholder={'name'} type={'text'} label={'Name'} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setName(e.target.value)} />
                    </div>
                    <div className={`mt-2 shrink ${styles.datePicker}`}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={date ? dayjs(date) : null} onChange={(newDate) => handleDate(newDate)} />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='flex justify-center gap-6'>
                    <Input placeholder={'category'} type={'text'} label={'Category'} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setCategory(e.target.value)} />
                    {categories && categories.map(cat => (
                        <>
                            <select className="select mt-2" onChange={(e: { target: { value: SetStateAction<string> } }) =>
                                setCategory(e.target.value)} >
                                <option value={category}>{cat?.name}</option>
                                <option><Button type={'primary'} text={'Add new category'} /></option>
                            </select>
                        </>
                    ))
                    }
                </div>
                <div className='flex justify-center  gap-6'>
                    <Input placeholder={'amount'} type={'number'} label={'Amount'} onChange={(e: { target: { value: SetStateAction<number> } }) =>
                        setAmount(e.target.value)} />
                    <div className='flex'>
                        <label className='align-start mb-2 '>Description</label>
                        <textarea cols={40} rows={5} placeholder='description' value={description}
                            onChange={(e: { target: { value: SetStateAction<string> } }) =>
                                setDescription(e.target.value)} />
                    </div>
                </div>
                <div>
                    <p className='flex jutify-start'>Priority:</p>
                    <select className="select mt-2" onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPriority(e.target.value)} >
                        <option value={"VERY_HIGH"}>VERY HIGH</option>
                        <option value={"HIGH"}>HIGH</option>
                        <option value={"MEDIUM"}>MEDIUM</option>
                        <option value={"LOW"}>LOW</option>
                        <option value={"VERY_LOW"}>VERY LOW</option>
                    </select>
                </div>
                <div className='flex justify-center gap-6'>
                    <Input placeholder={'currency'} type={'text'} label={'Currency'} value={currency}
                        onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setCurrency(e.target.value)} maxLength={3} />

                    <div className={`gap-6`}>
                        <p>Is recurring ?</p>
                        <div>
                            <input type='radio' name='radio' onChange={() => setIsrecurring(true)} />
                            <label>Yes</label>
                        </div>
                        <div>
                            <input type='radio' name='radio' onChange={() => setIsrecurring(false)} />
                            <label>No</label>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center mt-4'>
                    <Button type={'primary'} text={'Save expense'} width={280} height={38} action={newExpense} />
                </div>
            </form>
        </div >
    )
}

export default ExpenseModal;