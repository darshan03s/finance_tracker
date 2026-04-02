import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

export default LargestExpense;
