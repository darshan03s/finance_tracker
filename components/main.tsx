'use client';

import BalanceTrend from './charts/balance-trend';
import CategoryBreakdown from './charts/category-breakdown';
import BalanceCard from './balance-income-expense/balance-card';
import { useFinanceStore } from '@/stores/finance-store';
import {
  getHighestExpenseCategory,
  getLargestExpense,
  getMonthlyCategoryBreakdown,
  getMonthlyExpenseComparison,
  getMonthlyIncomeExpenseTrend,
  getMonthlyTotals,
  getTodaysExpense,
  getTodaysIncome
} from '@/lib/finance-utils';
import IncomeCard from './balance-income-expense/income-card';
import ExpenseCard from './balance-income-expense/expense-card';
import HighestExpenseCategory from './insights/highest-expense-category';
import MonthlyComparison from './insights/monthly-comparison';
import LargestExpense from './insights/largest-expense';
import Transactions from './transactions/transactions';

const Main = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const monthlyTotals = getMonthlyTotals(transactions);
  const todaysIncome = getTodaysIncome(transactions);
  const todaysExpense = getTodaysExpense(transactions);
  const chartData = getMonthlyIncomeExpenseTrend(transactions);
  const expenseCategories = useFinanceStore((s) => s.categories.expense);
  const incomeCategories = useFinanceStore((s) => s.categories.income);
  const expenseCategoryData = getMonthlyCategoryBreakdown(transactions, expenseCategories);
  const incomeCategoryData = getMonthlyCategoryBreakdown(transactions, incomeCategories, 'income');
  const highestExpense = getHighestExpenseCategory(transactions, expenseCategories);
  const expenseComparison = getMonthlyExpenseComparison(transactions);
  const largestExpense = getLargestExpense(transactions);

  return (
    <main className="pb-4">
      <div className="h-10 flex items-center justify-center py-6">{new Date().toDateString()}</div>
      <div className="space-y-4">
        <div className="balance-income-expense grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
          <BalanceCard />
          <IncomeCard incomeThisMonth={monthlyTotals.income} incomeToday={todaysIncome} />
          <div className="sm:col-span-2 lg:col-span-1">
            <ExpenseCard expenseThisMonth={monthlyTotals.expense} expenseToday={todaysExpense} />
          </div>
        </div>

        <div className="charts grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 px-10 gap-4">
          <div className="h-72">
            <BalanceTrend chartData={chartData} />
          </div>
          <div className="h-72">
            <CategoryBreakdown
              expenseCategoryData={expenseCategoryData}
              expenseCategories={expenseCategories}
              incomeCategoryData={incomeCategoryData}
              incomeCategories={incomeCategories}
            />
          </div>
        </div>

        <div className="insights grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 gap-4">
          <HighestExpenseCategory data={highestExpense} />
          <MonthlyComparison data={expenseComparison} />
          <div className="sm:col-span-2 lg:col-span-1">
            <LargestExpense data={largestExpense} />
          </div>
        </div>

        <h1 className="text-lg md:text-2xl text-center py-4">Transactions</h1>

        <div className="transactions px-10 md:px-20 space-y-4">
          <Transactions transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default Main;
