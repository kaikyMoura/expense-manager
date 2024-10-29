import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    data: IExpense[];
}

const BarChart = ({ data: expenses }: ChartProps) => {
    const monthlyExpenses = useMemo(() => {
        const totals: { [key: string]: number } = {};

        expenses.forEach((expense) => {
            const month = new Date(expense.date).toLocaleString('eng-us', { month: 'long' });
            totals[month] = (totals[month] || 0) + Number(expense.amount);
        });

        return {
            labels: Object.keys(totals),
            datasets: [
                {
                    label: 'Month Expenses',
                    data: Object.values(totals),
                    backgroundColor: '#dfdfdf',
                    borderColor: '#cecece',
                    borderWidth: 1,
                },
            ],
        };
    }, [expenses]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Total expenses by month',
            },
        },
    };

    return <Bar data={monthlyExpenses} options={options} width={300} height={150}/>;
};

export default BarChart;