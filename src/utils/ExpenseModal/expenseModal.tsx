import { addExpense } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import Input from '@/components/Input/input';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { SetStateAction, useState } from 'react';
import styles from './expenseModal.module.css';
import { useRouter } from 'next/router';

interface AlertProps {
    Close?: Function | any,
    action?: () => void
}

const ExpenseModal = ({ Close }: AlertProps) => {

    const router = useRouter()

    const [id, setId] = useState(Number)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [currency, setCurrency] = useState("")
    const [isrecurring, setIsrecurring] = useState(Boolean)
    const [priority, setPriority] = useState<"Very high" | "High" | "Medium" | "Very low" | "Low" | undefined>()
    const [amount, setAmount] = useState(Number)
    const [date, setDate] = useState<Dayjs | any>(dayjs())

    const newExpense = async () => {
        setId((prevQuantity: any) => ({
            ...prevQuantity,
            [id]: (prevQuantity[id] || 0) + 1,
        }))
        const expense: IExpense = {
            name: "fafsa",
            description: description,
            amount: amount,
            date: date,
            category: category,
            currency: currency,
            isRecurring: isrecurring,
            attachments: [],
            priority: "High"
        }
        console.log(expense)

        await addExpense(expense).then(() =>
            router.push('/Home/home')
        ).catch((erro: any) => {
            console.error("Erro: ", erro)
        })
    }

    const handleDate = (newDate: Dayjs | null) => {
        console.log(dayjs(newDate).format('YYYY-MM-DD'))
        setDate(dayjs(newDate).format('YYYY-MM-DD'))
    }

    return (
        <div className={`flex ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={Close} className={`${styles.closeButton}`}>
                <FontAwesomeIcon icon={faX} fontSize={20} />
            </button>
            <div className={`${styles.modalContainer}`}>
                <div className='flex justify-start mt-6 ml-2'>
                    <h2 className="text-xl font-medium">Add expense</h2>
                </div>
                <div className='flex justify-center mt-10 gap-6'>
                    {/* <label className='flex align-start mb-2 '>Date</label> */}
                    <Input placeholder={'category'} type={'text'} label={'Category'} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setCategory(e.target.value)} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={date ? dayjs(date) : null} onChange={(newDate) => handleDate(newDate)} />
                    </LocalizationProvider>
                </div>
                <div className='flex justify-center mt-10 gap-6'>
                    <Input placeholder={'amount'} type={'number'} label={'Amount'} onChange={(e: { target: { value: SetStateAction<number> } }) =>
                        setAmount(e.target.value)} />
                    <div className='flex'>
                        {/* <label className='align-start mb-2 '>Description</label> */}
                        <textarea cols={40} rows={5} placeholder='description' value={description}
                            onChange={(e: { target: { value: SetStateAction<string> } }) =>
                                setDescription(e.target.value)} />
                    </div>
                </div>
                <div className='flex justify-center mt-10 gap-6'>
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
            </div>
        </div >
    )
}

export default ExpenseModal;