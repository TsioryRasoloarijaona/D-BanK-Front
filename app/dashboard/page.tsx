"use client";

import React from "react";
import TransactionChart from "../components/transactionChart/page";
import ExpenseChart from "../components/expenseChart/page";
import ProvisioningChart from "../components/provisioningChart/page";
import '@/app/dashboard/dashboard.css'

const DashBoardPage: React.FC = () => {
  return (
    <main className="dashboard-bg">
      <div className={`chartContainer pt-8 flex flex-col w-full`}>
        <div className={`flex flex-row justify-evenly`}>
          <TransactionChart categoryName={""} sum={0} />
          <ExpenseChart />
        </div>
        <ProvisioningChart />
      </div>
    </main>
  )
}

export default DashBoardPage;