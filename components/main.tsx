'use client';

import IncomeExpenseTrend from './charts/income-expense-trend';
import CategoryBreakdown from './charts/category-breakdown';
import BalanceCard from './balance-income-expense/balance-card';
import { useFinanceStore } from '@/stores/finance-store';
import {
  getDailyIncomeExpenseTrend,
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
import DatePicker from './date-picker';
import { useDateStore } from '@/stores/date-store';

const Main = () => {
  const date = useDateStore((s) => s.date);
  const safeDate = new Date(date);
  const transactions = useFinanceStore((s) => s.transactions);
  const expenseCategories = useFinanceStore((s) => s.categories.expense);
  const incomeCategories = useFinanceStore((s) => s.categories.income);
  const monthlyTotals = getMonthlyTotals(transactions, safeDate);
  const todaysIncome = getTodaysIncome(transactions, safeDate);
  const todaysExpense = getTodaysExpense(transactions, safeDate);
  const monthlyChartData = getMonthlyIncomeExpenseTrend(transactions, safeDate.getFullYear());
  const dailyChartData = getDailyIncomeExpenseTrend(transactions, safeDate);
  const expenseCategoryData = getMonthlyCategoryBreakdown(
    transactions,
    expenseCategories,
    'expense',
    safeDate.getFullYear()
  );
  const incomeCategoryData = getMonthlyCategoryBreakdown(
    transactions,
    incomeCategories,
    'income',
    safeDate.getFullYear()
  );
  const highestExpense = getHighestExpenseCategory(transactions, expenseCategories, safeDate);
  const expenseComparison = getMonthlyExpenseComparison(transactions, safeDate);
  const largestExpense = getLargestExpense(transactions, safeDate);

  return (
    <main className="pb-4">
      <div className="flex items-center justify-center py-4">
        <DatePicker />
      </div>
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
            <IncomeExpenseTrend
              monthlyChartData={monthlyChartData}
              dailyChartData={dailyChartData}
            />
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
