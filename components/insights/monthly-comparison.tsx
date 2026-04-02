import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MonthlyComparison = ({
  data
}: {
  data: {
    currentExpense: number;
    previousExpense: number;
    difference: number;
  };
}) => {
  let message = '';

  if (data.previousExpense === 0 && data.currentExpense === 0) {
    message = 'No expense data available';
  } else if (data.previousExpense === 0) {
    message = `You spent $${data.currentExpense} this month`;
  } else if (data.difference > 0) {
    message = `You spent $${data.difference} more than last month`;
  } else if (data.difference < 0) {
    message = `You spent $${Math.abs(data.difference)} less than last month`;
  } else {
    message = `Your spending is the same as last month`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly comparison</CardTitle>
        <CardDescription>Comparison to previous month</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-full w-full">
        <span className="text-lg text-center">{message}</span>
      </CardContent>
    </Card>
  );
};

export default MonthlyComparison;
