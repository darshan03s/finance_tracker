'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DailyChartData, MonthlyChartData } from '@/types';
import { useState } from 'react';
import { HoverTooltip } from '../wrappers';
import { Button } from '../ui/button';
import { CalendarDays, CalendarRange } from 'lucide-react';

const chartConfig = {
  income: {
    label: 'Income',
    color: '#22c55e'
  },
  expense: {
    label: 'Expense',
    color: '#ef4444'
  }
} satisfies ChartConfig;

const MonthlyTrend = ({ monthlyChartData }: { monthlyChartData: MonthlyChartData[] }) => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={monthlyChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            new Intl.NumberFormat('en-IN', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value)
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" />
        <Bar dataKey="expense" fill="var(--color-expense)" />
      </BarChart>
    </ChartContainer>
  );
};

const DailyTrend = ({ dailyChartData }: { dailyChartData: DailyChartData[] }) => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={dailyChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            new Intl.NumberFormat('en-IN', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value)
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" />
        <Bar dataKey="expense" fill="var(--color-expense)" />
      </BarChart>
    </ChartContainer>
  );
};

const IncomeExpenseTrend = ({
  monthlyChartData,
  dailyChartData
}: {
  monthlyChartData: MonthlyChartData[];
  dailyChartData: DailyChartData[];
}) => {
  const [filter, setFilter] = useState<'daily' | 'monthly'>('monthly');

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Income and Expense Trends</CardTitle>
        <CardDescription className="text-xs sm:text-md">
          Your income and expense trends
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <HoverTooltip message="Monthly trend">
              <Button
                size={'icon-xs'}
                variant={filter === 'monthly' ? 'default' : 'outline'}
                onClick={() => setFilter('monthly')}
              >
                <CalendarRange />
              </Button>
            </HoverTooltip>
            <HoverTooltip message="Daily trend">
              <Button
                size={'icon-xs'}
                variant={filter === 'daily' ? 'default' : 'outline'}
                onClick={() => setFilter('daily')}
              >
                <CalendarDays />
              </Button>
            </HoverTooltip>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {filter === 'monthly' ? (
          <MonthlyTrend monthlyChartData={monthlyChartData} />
        ) : (
          <DailyTrend dailyChartData={dailyChartData} />
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseTrend;
