"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { log } from 'console';

interface Provisioning {
  sum: number;
  categoryName: string;
}

export default function BasicPie() {
  const [data1, setData1] = useState<Provisioning[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/sum/byCategory')
      .then(res => res.json())
      .then((data: Provisioning[]) => {
        setData1(data);
      });
  }, []);


  const pieChartData = data1.map((item, index) => ({
    id: index, // Assuming categoryName can be used as id
    value: item.sum,
    label: item.categoryName,
  }));

  console.log(pieChartData)

  return (
    <PieChart
      // colors={'green' , 'blue', 'yellow'}
      series={[
        {
          data: [
            { id: 0, value: 100, label: "Food & Drinks" },

            { id: 1, value: 120, label: "Shopping" },

            { id: 2, value: 100, label: "Housing" },

            { id: 3, value: 200500445, label: "Vehicle" },

            { id: 4, value: 300000, label: "Financial expenses" },

            { id: 5, value: 201000, label: "Investments" },

            { id: 6, value: 5069, label: "repay" },

            { id: 7, value: 6010, label: "loan money" },

            { id: 8, value: 101100, label: "Income" },

            { id: 9, value: 8000, label: "Salary" },

            { id: 10, value: 200003722, label: "Investment Returns" },
            { id: 11, value: 9998100, label: "Freelance Income" },

            { id: 12, value: 4730, label: "Rental Income" }


          ],
        },
      ]}
      width={500}
      height={500}
    />
  );
}
