"use client"
import React, { useEffect, useState } from "react"
import Chart, { ChartData, ChartOptions } from "chart.js/auto"
import { TransactionSum } from "@/app/interface/transactionSum"
import '@/app/components/transactionChart/transactionPieChart.css'
import formatDate from "../dateConversion";

const TransactionChart: React.FC<TransactionSum> = () => {
    const [transactionSums, setTransactionSums] = useState<TransactionSum[]>([]);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!startDate) {
                console.error('start date is null');
                return;
            }

            const startFormatted: string = formatDate(startDate);
            let url = `http://localhost:8080/sum/byCategory/${startFormatted}`;

            if (endDate) {
                const endFormatted: string = formatDate(endDate);
                url += `/${endFormatted}`;
            } else {
                console.error('end date is null');
            }

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setTransactionSums(data);
                } else {
                    throw new Error('Failed to fetch transaction sums');
                }
            } catch (error) {
                console.error('Error fetching transaction sums:', error);
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
        const fetchTransactionSums = async () => {
            try {
                const response = await fetch('http://localhost:8080/sum/byCategory');
                if (response.ok) {
                    const data = await response.json();
                    setTransactionSums(data);
                } else {
                    throw new Error('Failed to fetch transaction sums');
                }
            } catch (error) {
                console.error('Error fetching transaction sums: ', error);
            }
        };
        fetchTransactionSums();
    }, []);

    useEffect(() => {
        if (transactionSums.length > 0) {
            const labels = transactionSums.filter((sum) => sum !== null).map((sum) => sum.categoryName);
            const amounts = transactionSums.filter((sum) => sum !== null).map((sum) => sum.sum);

            const ctx = document.getElementById('transactionPieChart') as HTMLCanvasElement;
            if (ctx) {
                if (chartInstance) {
                    chartInstance.destroy();
                }

                const newChartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            data: amounts,
                            backgroundColor: [
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
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    generatedLabels: (chart: Chart) => {
                                        const data: ChartData = chart.data;
                                        if (data.labels && data.datasets) {
                                            return data.labels.map((label, index) => {
                                                const dataset = data.datasets[0];
                                                const backgroundColor = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[index] : '';
                                                const value = dataset.data ? dataset.data[index] : '';
                                                return {
                                                    text: `${label} - ${value} MGA`,
                                                    fillStyle: backgroundColor,
                                                };
                                            });
                                        }
                                        return [];
                                    },
                                    filter: (legendItem, chartData) => {
                                        return legendItem.text !== '';
                                    },
                                },
                            },
                        },
                    } as ChartOptions,
                });
                setChartInstance(newChartInstance);
            }
        }
    }, [transactionSums]);

    return (
        <div className={`pieContainer flex flex-col items-center gap-2`}>
            <div className={`bg-white mt-3 py-3 w-full`}><h2 className={`text-xl text-red-600 text-center border-solid border-black border-b-2 mx-32`}> Transaction sum by category</h2></div>
            <div className={`flex flex-row bg-white py-2 w-full justify-center`}>
                <div className={`flex flex-row items-center border-solid border-slate-700 border-r-2 pr-3`}>
                    <label htmlFor="startDate" className={`w-1/2 text-red-800 `}>From </label>
                    <input type="date" id="startDate" onChange={handleStartDateChange} />
                </div>
                <div className={`flex flex-row items-center pl-3`}>
                    <label htmlFor="endDate" className={`w-1/2 text-red-800`}>To </label>
                    <input type="date" id="endDate" onChange={handleEndDateChange} />
                </div>
            </div>
            <div className={`pieSize`}><canvas id='transactionPieChart' className={`mt-0`}></canvas></div>
        </div>
    );

}

export default TransactionChart;