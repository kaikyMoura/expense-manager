import { addExpense, getExpensesCategories } from '@/api/services/expenseService';
import Button from '@/components/Button/button';
import Input from '@/components/Input/input';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { SetStateAction, useEffect, useState } from 'react';
import styles from './expenseModal.module.css';
import { useRouter } from 'next/router';

interface ModalProps {
    Close?: Function | any,
    action?: () => void
}

const ExpenseModal = ({ Close }: ModalProps) => {

    const router = useRouter()
    const { setLoading } = useLoadingContext()

    const [id, setId] = useState(Number)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [currency, setCurrency] = useState("")
    const [isrecurring, setIsrecurring] = useState(Boolean)
    const [isPaid, setIsPaid] = useState(Boolean)
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
            isPaid: isPaid,
            attachments: [],
            priority: priority
        }

        console.log(expense)

        setLoading(true)
        await addExpense(expense).then(() => {
            setLoading(false)
            console.log(expense)
            Close
            router.replace('/Expense/expenses')
        }).catch((erro: any) => {
            setLoading(false)
            console.error("Erro: ", erro)
        })
    }

    const handleCategoryChange = (e: any) => {
        console.log(e)
        setCategory(e)
    }

    const handlePriorityChange = (e: any) => {
        setPriority(e.target.value)
    }

    const handleDate = (newDate: Dayjs | null) => {
        console.log(dayjs(newDate).format('YYYY-MM-DD'))
        const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
        setDate(formattedDate)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getExpensesCategories()
            console.log(data)
            if (data.success === true && data.data) {
                setCategories(data.data)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={`${styles.modalContainer}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={Close} className={`${styles.closeButton}`}>
                <FontAwesomeIcon icon={faX} height={20} />
            </button>
            <form className={`${styles.modal} w-full`}>
                <div className='flex justify-center mt-2 ml-2'>
                    <h2 className="text-2xl font-medium">Add expense</h2>
                </div>
                <div className='flex justify-center gap-6'>
                    <div className=''>
                        <Input placeholder={'name'} type={'text'} label={'Name'} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)} />
                    </div>
                    <div className={`mt-4`}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={date ? dayjs(date) : null} onChange={(newDate) => handleDate(newDate)} />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='flex justify-center gap-6'>
                    {category === ' ' || category === undefined && (
                        <div className="flex mt-4 mr-6">
                            <label htmlFor="">Category</label>
                            <select
                                className="mt-2"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories && categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                                <option value="new">Add new category</option>
                            </select>
                        </div>
                    )}

                    {category !== undefined && (
                        <div className="flex gap-2">
                            <Input
                                placeholder={'New category'}
                                type={'text'}
                                label={'Category'}
                                onChange={(e: { target: { value: SetStateAction<string> } }) => handleCategoryChange(e.target.value)}
                            />
                            <FontAwesomeIcon className='cursor-pointer' icon={faX} height={20} onClick={() => setCategory('')} />
                        </div>
                    )}

                    <div className='flex justify-center gap-6 w-[50%]'>
                        <div className=''>
                            <p className='align-start'>Description</p>
                            <textarea className='p-2 border border-gray-300 rounded-md' cols={50} rows={2} placeholder='description' value={description} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-6 mt-2'>
                    <div>
                        <Input placeholder={'amount'} type={'number'} label={'Amount'} onChange={(e: { target: { value: SetStateAction<number>; }; }) => setAmount(e.target.value)} />
                    </div>
                    <div className='p-4'>
                        <p>Priority:</p>
                        <select className="select mt-2 w-full" onChange={(e) => handlePriorityChange(e)}>
                            <option value={"VERY_HIGH"}>VERY HIGH</option>
                            <option value={"HIGH"}>HIGH</option>
                            <option value={"MEDIUM"}>MEDIUM</option>
                            <option value={"LOW"}>LOW</option>
                            <option value={"VERY_LOW"}>VERY LOW</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-6 mt-2 justify-center'>
                    <div>
                        <Input placeholder={'currency'} type={'text'} label={'Currency'} value={currency} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCurrency(e.target.value)} maxLength={3} />
                    </div>
                    <div className=''>
                        <p>Is recurring  ?</p>
                        <div className=' flex gap-6'>
                            <div className='flex items-center'>
                                <input type='radio' name='radio' onChange={() => setIsrecurring(true)} />
                                <label className='ml-2'>Yes</label>
                            </div>
                            <div className='flex items-center'>
                                <input type='radio' name='radio' onChange={() => setIsrecurring(false)} />
                                <label className='ml-2'>No</label>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <p>Is paid ?</p>
                        <div className=' flex gap-6'>
                            <div className='flex items-center'>
                                <input type='radio' name='radio' onChange={() => setIsPaid(true)} />
                                <label className='ml-2'>Yes</label>
                            </div>
                            <div className='flex items-center'>
                                <input type='radio' name='radio' onChange={() => setIsPaid(false)} />
                                <label className='ml-2'>No</label>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex justify-center mt-4'>
                    <Button type={'primary'} text={'Save expense'} width={280} height={38} action={newExpense} />
                </div>
            </form>
        </div>

    )
}

export default ExpenseModal;