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

const BalanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Your total balance</CardDescription>
        <CardAction>
          <div>
            <Button size={'xs'} className="text-xs" variant={'outline'}>
              Add balance
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-5xl h-full w-full">
        <p>$1000</p>
      </CardContent>
    </Card>
  );
};

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

const Main = () => {
  return (
    <main>
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
      </div>
    </main>
  );
};

export default Main;
