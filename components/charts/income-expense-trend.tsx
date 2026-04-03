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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/types';

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

const ChartWrapper = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" />
        <Bar dataKey="expense" fill="var(--color-expense)" />
      </BarChart>
    </ChartContainer>
  );
};

const IncomeExpenseTrend = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Income and Expense Trends</CardTitle>
        <CardDescription className="text-xs sm:text-md">
          Your income and expense trends
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartWrapper chartData={chartData} />
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseTrend;
