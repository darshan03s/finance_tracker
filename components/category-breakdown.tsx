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
import { ExpenseCategory } from '@/types';

const ChartWrapper = ({
  chartData,
  categories
}: {
  chartData: Record<string, string | number>[];
  categories: ExpenseCategory[];
}) => {
  const chartConfig: ChartConfig = {};

  categories.forEach((cat) => {
    chartConfig[cat] = {
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      color: cat === 'food' ? '#f59e0b' : cat === 'rent' ? '#ef4444' : '#a855f7'
    };
  });

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />

        <XAxis dataKey="month" tickLine={false} axisLine={false} />

        <YAxis tickLine={false} axisLine={false} />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        {categories.map((cat) => (
          <Bar key={cat} dataKey={cat} stackId="expense" fill={`var(--color-${cat})`} />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

const CategoryBreakdown = ({
  chartData,
  categories
}: {
  chartData: Record<string, string | number>[];
  categories: ExpenseCategory[];
}) => {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Expenses by category</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <ChartWrapper chartData={chartData} categories={categories} />
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
