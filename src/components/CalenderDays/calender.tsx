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

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expenses = await getAllExpenses();
                const days = expenses.map(expense => dayjs(expense.date));
                setHighlightedDays(days);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

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
                            fontSize: 16,
                        },
                        '.MuiPickersDay-today': {
                            borderRadius: '10px',
                            borderWidth: '1px',
                            borderColor: 'black',
                            border: '1px solid',
                        },
                        '.Mui-selected': {
                            borderRadius: '10px',
                            borderColor: 'black',
                            backgroundColor: 'black',
                            color: 'white'
                        },
                        '.MuiDateCalendar-root': {
                            color: 'black',
                            borderRadius: '6px',
                            backgroundColor: '#d3d3d3',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                        },
                        '.MuiPickersCalendarHeader-label': {
                            color: 'black',
                            borderRadius: '6px',
                        },
                    }}
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