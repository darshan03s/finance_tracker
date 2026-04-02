import { useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '../ui/button';
import AddIncomeDialog from './add-income-dialog';

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

export default IncomeCard;
