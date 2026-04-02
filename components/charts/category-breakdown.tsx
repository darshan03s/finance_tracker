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
import { ExpenseCategory, IncomeCategory } from '@/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { capitalize } from '@/lib/utils';

const ExpenseChart = ({
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

const IncomeChart = ({
  chartData,
  categories
}: {
  chartData: Record<string, string | number>[];
  categories: IncomeCategory[];
}) => {
  const chartConfig: ChartConfig = {};

  categories.forEach((cat) => {
    chartConfig[cat] = {
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      color: cat === 'freelance' ? '#f59e0b' : '#a855f7'
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
          <Bar key={cat} dataKey={cat} stackId="income" fill={`var(--color-${cat})`} />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

const CategoryBreakdown = ({
  expenseCategoryData,
  expenseCategories,
  incomeCategoryData,
  incomeCategories
}: {
  expenseCategoryData: Record<string, string | number>[];
  expenseCategories: ExpenseCategory[];
  incomeCategoryData: Record<string, string | number>[];
  incomeCategories: IncomeCategory[];
}) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>{capitalize(type)} by category</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button
              variant={type === 'expense' ? 'default' : 'outline'}
              onClick={() => setType('expense')}
            >
              <BanknoteArrowDown />
            </Button>
            <Button
              variant={type === 'income' ? 'default' : 'outline'}
              onClick={() => setType('income')}
            >
              <BanknoteArrowUp />
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        {type === 'expense' ? (
          <ExpenseChart chartData={expenseCategoryData} categories={expenseCategories} />
        ) : (
          <IncomeChart chartData={incomeCategoryData} categories={incomeCategories} />
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
