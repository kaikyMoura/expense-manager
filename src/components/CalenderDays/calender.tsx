import dayjs, { Dayjs } from 'dayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAllExpenses } from '@/api/services/expenseService';
import { useState, useEffect } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'

// https://stackoverflow.com/questions/76576451/highlight-the-days-in-mui-staticdatepicker-calender

interface ServerDayProps {
    highlightedDays: Dayjs[];
    day: Dayjs;
    outsideCurrentMonth: boolean;
}


const ServerDay: React.FC<ServerDayProps> = ({ highlightedDays, day, outsideCurrentMonth, ...other }) => {
    const isSelected =
        !outsideCurrentMonth &&
        highlightedDays.some(highlightedDay => highlightedDay.isSame(day, 'day'));

    return (
        <PickersDay
            onDaySelect={() => { }} isFirstVisibleCell={false} isLastVisibleCell={false} {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            selected={isSelected} />
    );
};


const Calendar = () => {
    const today = dayjs();
    const [highlightedDays, setHighlightedDays] = useState<Dayjs[]>([]);

    const fetchExpenses = async () => {
        try {
            const data = await getAllExpenses()
            console.log(data)
            if (data.success === true) {
                const days = data.data.map((expense: IExpense) => dayjs(expense.date));
                setHighlightedDays(days);
                console.log(days)
            }
        } catch (error) {
            console.error('Failed to fetch expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);
    // https://mui.com/x/react-date-pickers/date-picker/
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    sx={{
                        '.MuiPickersDay-root': {
                            borderRadius: '10px',
                            backgroundColor: "white",
                            fontSize: 16,
                        },
                        '.MuiPickersDay-today': {
                            borderRadius: '10px',
                            borderWidth: '1px',
                            borderColor: '#000000',
                            border: '1px solid',
                        },
                        '.Mui-selected': {
                            borderRadius: '10px',
                            backgroundColor: '#000000'
                        },
                        '.MuiDateCalendar-root': {
                            color: '#000000',
                            borderRadius: '6px',
                            backgroundColor: '#d3d3d3',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                        },
                        '.MuiPickersCalendarHeader-label': {
                            color: '#000000',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                        },
                    }}
                    onChange={fetchExpenses}
                    displayStaticWrapperAs='desktop'
                    maxDate={today.add(1, 'month')}
                    slots={{
                        day: (props) => <ServerDay {...props} highlightedDays={highlightedDays} />,
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default Calendar;