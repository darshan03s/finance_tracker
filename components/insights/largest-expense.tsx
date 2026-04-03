import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { capitalize } from '@/lib/utils';
import { Transaction } from '@/types';

const LargestExpense = ({ data }: { data: Transaction | null }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Largest Expense this month</CardTitle>
        <CardDescription className="text-xs sm:text-md">
          This is your most expensive purchase
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-full w-full">
        {!data ? (
          <span className="text-sm text-muted-foreground">No expenses this month</span>
        ) : (
          <div className="flex flex-col gap-1 items-center text-center">
            <span className="text-3xl">{capitalize(data.name)}</span>
            <span className="text-sm text-muted-foreground">{capitalize(data.category)}</span>
            <span className="text-xs">${data.amount}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LargestExpense;
