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

const IncomeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income</CardTitle>
        <CardDescription>This {"month's"} income</CardDescription>
        <CardAction>
          <div>
            <Button size={'xs'} className="text-xs" variant={'outline'}>
              Add income
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-5xl h-full w-full">
        <p>$500</p>
      </CardContent>
    </Card>
  );
};

const ExpenseCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense</CardTitle>
        <CardDescription>This {"month's"} expense</CardDescription>
        <CardAction>
          <div>
            <Button size={'xs'} className="text-xs" variant={'outline'}>
              Add expense
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-5xl h-full w-full">
        <p>$200</p>
      </CardContent>
    </Card>
  );
};

const HighestExpenseCategory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highest Expense Category</CardTitle>
        <CardDescription>You spent most on this category</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-2xl">Food</span>
          <span>$100</span>
        </div>
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
  return (
    <main className="pb-4">
      <div className="h-10 flex items-center justify-center py-6">{new Date().toDateString()}</div>
      <div className="space-y-4">
        <div className="balance-income-expense grid grid-cols-1 sm:grid-cols-3 gap-4 px-10">
          <BalanceCard />
          <IncomeCard />
          <ExpenseCard />
        </div>

        <div className="charts grid grid-cols-1 sm:grid-cols-2 px-10 gap-4">
          <div className="h-72">
            <BalanceTrend />
          </div>
          <div className="h-72">
            <CategoryBreakdown />
          </div>
        </div>

        <div className="insights grid grid-cols-1 sm:grid-cols-3 px-10 gap-4">
          <HighestExpenseCategory />
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
          <Transactions />
        </div>
      </div>
    </main>
  );
};

export default Main;
