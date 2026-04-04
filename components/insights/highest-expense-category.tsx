import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const HighestExpenseCategory = ({ data }: { data: { category: string; amount: number } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Highest Expense Category</CardTitle>
        <CardDescription className="text-xs sm:text-md">
          You spent most on this category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full w-full">
        {data.amount === 0 ? (
          <span className="text-sm text-muted-foreground">No expenses this month</span>
        ) : (
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl">
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </span>
            <span>{formatCurrency(data.amount)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HighestExpenseCategory;
