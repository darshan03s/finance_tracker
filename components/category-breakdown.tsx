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

type ChartData = {
  month: string;
  food: number;
  rent: number;
  entertainment: number;
};

const chartData: ChartData[] = [
  { month: 'Jan', food: 800, rent: 1500, entertainment: 400 },
  { month: 'Feb', food: 700, rent: 1500, entertainment: 350 },
  { month: 'Mar', food: 900, rent: 1500, entertainment: 500 },
  { month: 'Apr', food: 850, rent: 1500, entertainment: 300 },
  { month: 'May', food: 950, rent: 1500, entertainment: 600 }
];

const chartConfig = {
  food: { label: 'Food', color: '#f59e0b' },
  rent: { label: 'Rent', color: '#ef4444' },
  entertainment: { label: 'Fun', color: '#a855f7' }
} satisfies ChartConfig;

const ChartWrapper = () => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />

        <XAxis dataKey="month" tickLine={false} axisLine={false} />

        <YAxis tickLine={false} axisLine={false} />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Bar dataKey="food" stackId="expense" fill="var(--color-food)" />
        <Bar dataKey="rent" stackId="expense" fill="var(--color-rent)" />
        <Bar dataKey="entertainment" stackId="expense" fill="var(--color-entertainment)" />
      </BarChart>
    </ChartContainer>
  );
};

const CategoryBreakdown = () => {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Expenses by category</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <ChartWrapper />
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
