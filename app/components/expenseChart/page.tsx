"use client";

import React, { useEffect, useState } from "react";
import '@/app/components/transactionChart/transactionPieChart.css';
import '@/app/components/expenseChart/expenseDoughnutChart.css';
import Chart from "chart.js/auto";
import { ExpenseSum } from "@/app/interface/expenseSum";

const ExpenseChart: React.FC = () => {
    const [expenseSums, setExpenseSums] = useState<ExpenseSum[]>([]);
    const [chartInstance, setChartInstance] = useState<Chart<"doughnut"> | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!startDate) {
                console.error('Start date is null');
                return;
            }
            const startDateFormatted: string = formatDate(startDate);
            let url = `http://localhost:8080/sum/expense/${startDateFormatted}`;

            if (endDate) {
                const endDateFormatted: string = formatDate(endDate);
                url += `/${endDateFormatted}`;
            } else {
                console.error('Start date is null');
            }
            try{
                const response = await fetch(url);
                if (response.ok){
                    const data = await response.json();
                    setExpenseSums(data);
                } else {
                    throw new Error('Failed to fetch expense sums');
                }
            } catch (error) {
                console.error('Error fetching expense sums: ', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setStartDate(date);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setEndDate(date);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/sum/expense');
                if (response.ok) {
                    const data = await response.json();
                    setExpenseSums(data);
                } else {
                    throw new Error('Failed fetching expense sums');
                }
            } catch (error) {
                console.error(`Error fetching expense sums: `, error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (expenseSums.length > 0) {
            const labels = expenseSums.map((sum) => sum.category_name);
            const amounts = expenseSums.map((sum) => sum.expense_total_sum);

            const ctx = document.getElementById('expenseChart') as HTMLCanvasElement;
            if (ctx) {
                if (chartInstance) {
                    chartInstance.destroy();
                }

                const newChartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels,
                        datasets: [{
                            data: amounts,
                            hoverBackgroundColor: [
                                'grey',
                                'blue',
                                'green',
                                'pink',
                                'yellow',
                                'khaki',
                                'olive',
                                'red',
                                'brown',
                                'turquoise',
                                'lavender',
                                'peach',
                                'mint',
                                'coral'
                            ], 
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                });
                setChartInstance(newChartInstance);
            }
        }
    }, [expenseSums]);

    return (
        <div className={`doughnutContainer  bg flex flex-col items-center gap-2`}>
            <div className={`bg-white mt-3 py-3 w-full`}><h2 className={`text-xl text-red-600 text-center border-solid border-black border-b-2 mx-32`}> Expense sum by category</h2></div>
            <div className={`flex flex-row bg-white py-2 w-full justify-center`}>
                <div className={`flex flex-row items-center border-solid border-slate-700 border-r-2 pr-3`}>
                    <label htmlFor="startDate" className={`w-1/2 text-red-800`}>From </label>
                    <input type="date" id="startDate"  onChange={handleStartDateChange}/>
                </div>
                <div className={`flex flex-row pl-3`}>
                    <label htmlFor="endDate" className={`w-1/2 text-red-800`}>To </label>
                    <input type="date" id="endDate"  onChange={handleEndDateChange}/>
                </div>
            </div>
            <div className={`doughnutSize w-1/2 h-96`}><canvas id='expenseChart'></canvas></div>
        </div>
    );
}

export default ExpenseChart;

