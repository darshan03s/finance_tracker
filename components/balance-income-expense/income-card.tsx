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
import { CalendarDays, CalendarRange } from 'lucide-react';
import { HoverTooltip } from '../wrappers';
import { formatCurrency } from '@/lib/utils';

const IncomeCard = ({
  incomeThisMonth,
  incomeToday
}: {
  incomeThisMonth: number;
  incomeToday: number;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'month' | 'day'>('month');

  const cardDescription = filter === 'month' ? `This month's income` : `Today's income`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-md sm:text-lg">Income</CardTitle>
          <CardDescription className="text-xs sm:text-md">{cardDescription}</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <HoverTooltip message="Today's income">
                <Button
                  size={'icon-xs'}
                  onClick={() => setFilter('day')}
                  variant={filter === 'day' ? 'default' : 'outline'}
                >
                  <CalendarDays />
                </Button>
              </HoverTooltip>
              <HoverTooltip message="This month's income">
                <Button
                  size={'icon-xs'}
                  onClick={() => setFilter('month')}
                  variant={filter === 'month' ? 'default' : 'outline'}
                >
                  <CalendarRange />
                </Button>
              </HoverTooltip>
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
        <CardContent className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl h-full w-full">
          <p>
            {filter === 'month' ? formatCurrency(incomeThisMonth) : formatCurrency(incomeToday)}
          </p>
        </CardContent>
      </Card>
      <AddIncomeDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default IncomeCard;
