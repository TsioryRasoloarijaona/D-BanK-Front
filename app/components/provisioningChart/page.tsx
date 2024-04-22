"use client";

import React, {useEffect, useState} from "react";
import Chart from "chart.js/auto";
import { ProvisioningSum } from "@/app/interface/provisioningSum";
import '@/app/components/transactionChart/transactionPieChart.css';
import '@/app/components/provisioningChart/provisioningBarChart.css';

const ProvisioningChart: React.FC = () => {
    const [provisioningSums, setProvisioningSums] = useState<ProvisioningSum[]>([]);
    const [chartInstance, setChartInstance] = useState<Chart<"bar"> | null>(null);
    const [startDate, setStartDate] = useState<Date|null>(null);
    const [endDate, setEndDate] = useState<Date|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!startDate){
                console.error('Start date is null');
                return;
            }

            const startDateFormatted: string = formatDate(startDate);
            let url =  `http://localhost:8080/sum/provisioning/${startDateFormatted}`;

            if(endDate){
                const endDateFormatted: string = formatDate(endDate);
                url += `/${endDateFormatted}`;
            } else {
                console.error('End date is null')
            }
            try{
                const response = await fetch(url);
                if(response.ok){
                    const data = await response.json();
                    setProvisioningSums(data);
                } else {
                    throw new Error('Failed to fetch provisioning sums');
                }
            }catch(error){
                console.error('Error fetching provisioning sums:', error);
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
            try{
                const response = await fetch ('http://localhost:8080/sum/provisioning');
                if(response.ok){
                    const data = await response.json();
                    setProvisioningSums(data);
                } else {
                    throw new Error('Failed fetching provisioning sums');
                }
            } catch (error){
                console.error('Error fetching provisioning sums: ', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(provisioningSums.length > 0){
            const labels = provisioningSums.map((sum) => sum.categoryName);
            const amounts = provisioningSums.map((sum) => sum.totalSum);

            const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'grey', 'pink', 'cyan', 'magenta'];

            const backgroundColors = amounts.map((_, index) => colors[index % colors.length]);

            const ctx = document.getElementById('provisioningChart') as HTMLCanvasElement;
            if(ctx){
                if(chartInstance){
                    chartInstance.destroy();
                }

                const newChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels, 
                        datasets: [{
                            label: 'Total sum',
                            data: amounts,
                            backgroundColor: backgroundColors,
                            hoverBackgroundColor: backgroundColors.map(color => darkenColor(color, 20))
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                setChartInstance(newChartInstance);
            }
        }
    }, [provisioningSums]);

    return (
        <div className={`barContainer  bg-slate-100 provisioningBar`}>
            <div className={`bg-white mt-2 h-12 pt-2 pl-60`}><h2 className={`text-xl text-red-600 text-center border-solid border-black border-b-2 mx-32`}> Expense sum by category</h2></div>
            <div className={`flex flex-row bg-white  mt-2  justify-center`}>
                <div className={`flex flex-row`}>
                    <label htmlFor="startDate" className={`w-1/2 text-red-800 text-lg`}>Start Date: </label>
                    <input type="date" id="startDate"  onChange={handleStartDateChange}/>
                </div>
                <div className={`flex flex-row`}>
                    <label htmlFor="endDate" className={`w-1/2 text-red-800 text-lg`}>End Date: </label>
                    <input type="date" id="endDate"  onChange={handleEndDateChange}/>
                </div>
            </div>
            <div className={`barSize w-1/2 h-96`}><canvas id='provisioningChart'></canvas></div>
        </div>
    );
}

function darkenColor(color: string, percent: number) {
    const f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

export default ProvisioningChart;
