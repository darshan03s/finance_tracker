'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';
import BalanceTrend from './balance-trend';
import CategoryBreakdown from './category-breakdown';
import Transactions from './transactions';
import { Input } from './ui/input';
import { Filter } from 'lucide-react';
import BalanceCard from './balance-card';
import { useEffect, useState } from 'react';
import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { defaultFinanceData, FinanceData, useFinanceStore } from '@/stores/finance-store';
import AddIncomeDialog from './add-income-dialog';
import AddExpenseDialog from './add-expense-dialog';
import {
  getHighestExpenseCategory,
  getMonthlyCategoryBreakdown,
  getMonthlyIncomeExpenseTrend,
  getMonthlyTotals
} from '@/lib/finance-utils';

const IncomeCard = ({ income }: { income: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
          <CardDescription>This {"month's"} income</CardDescription>
          <CardAction>
            <div>
              <Button
                size={'xs'}
                className="text-xs"
                variant={'outline'}
                onClick={() => setOpen(true)}
              >
                Add income
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-5xl h-full w-full">
          <p>${income}</p>
        </CardContent>
      </Card>
      <AddIncomeDialog open={open} setOpen={setOpen} />
    </>
  );
};

const ExpenseCard = ({ expense }: { expense: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Expense</CardTitle>
          <CardDescription>This {"month's"} expense</CardDescription>
          <CardAction>
            <div>
              <Button
                size={'xs'}
                className="text-xs"
                variant={'outline'}
                onClick={() => setOpen(true)}
              >
                Add expense
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-5xl h-full w-full">
          <p>${expense}</p>
        </CardContent>
      </Card>
      <AddExpenseDialog open={open} setOpen={setOpen} />
    </>
  );
};

const HighestExpenseCategory = ({ data }: { data: { category: string; amount: number } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highest Expense Category</CardTitle>
        <CardDescription>You spent most on this category</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full w-full">
        {data.amount === 0 ? (
          <span className="text-sm text-muted-foreground">No expenses this month</span>
        ) : (
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl">
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </span>
            <span>${data.amount}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MonthlyComparison = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly comparison</CardTitle>
        <CardDescription>Comparison to previous month</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg">You have spent $200 less this month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const LargestExpense = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Largest Expense</CardTitle>
        <CardDescription>This was your most expensive purchase</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg">Nike Air Jordan</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Main = () => {
  function init() {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(defaultFinanceData));
    } else {
      const parsed = JSON.parse(data) as FinanceData;
      useFinanceStore.setState({
        balance: parsed.balance,
        transactions: parsed.transactions,
        monthlyBalances: parsed.monthlyBalances || []
      });
    }
  }

  useEffect(() => {
    init();
  }, []);

  const transactions = useFinanceStore((s) => s.transactions);
  const monthlyTotals = getMonthlyTotals(transactions);
  const chartData = getMonthlyIncomeExpenseTrend(transactions);
  const expenseCategories = useFinanceStore((s) => s.categories.expense);
  const incomeCategories = useFinanceStore((s) => s.categories.income);
  const expenseCategoryData = getMonthlyCategoryBreakdown(transactions, expenseCategories);
  const incomeCategoryData = getMonthlyCategoryBreakdown(transactions, incomeCategories, 'income');
  const highestExpense = getHighestExpenseCategory(transactions, expenseCategories);

  return (
    <main className="pb-4">
      <div className="h-10 flex items-center justify-center py-6">{new Date().toDateString()}</div>
      <div className="space-y-4">
        <div className="balance-income-expense grid grid-cols-1 sm:grid-cols-3 gap-4 px-10">
          <BalanceCard />
          <IncomeCard income={monthlyTotals.income} />
          <ExpenseCard expense={monthlyTotals.expense} />
        </div>

        <div className="charts grid grid-cols-1 sm:grid-cols-2 px-10 gap-4">
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

        <div className="insights grid grid-cols-1 sm:grid-cols-3 px-10 gap-4">
          <HighestExpenseCategory data={highestExpense} />
          <MonthlyComparison />
          <LargestExpense />
        </div>

        <h1 className="text-2xl text-center py-6">Transactions</h1>

        <div className="transactions px-20 space-y-4">
          <div className="flex items-center gap-4">
            <Input placeholder="Search your transactions" />
            <Button>
              <Filter />
            </Button>
          </div>
          <Transactions transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default Main;
