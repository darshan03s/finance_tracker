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
import { Button } from '../ui/button';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { capitalize } from '@/lib/utils';
import { HoverTooltip } from '../wrappers';
import { useFinanceStore } from '@/stores/finance-store';
import { useDateStore } from '@/stores/date-store';

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
      color: cat === 'freelance' ? '#10b981' : '#3b82f6'
    };
  });

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />

        <XAxis dataKey="month" tickLine={false} axisLine={false} />

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
  const categoryBreakdownChartType = useFinanceStore((s) => s.categoryBreakdownChartType);
  const date = useDateStore((s) => s.date);

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Category Breakdown</CardTitle>
        <CardDescription className="text-xs sm:text-md">
          {capitalize(categoryBreakdownChartType)} by category
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <HoverTooltip message="Show Expenses">
              <Button
                size={'icon-xs'}
                variant={categoryBreakdownChartType === 'expense' ? 'default' : 'outline'}
                onClick={() => useFinanceStore.setState({ categoryBreakdownChartType: 'expense' })}
              >
                <BanknoteArrowUp />
              </Button>
            </HoverTooltip>
            <HoverTooltip message="Show Income">
              <Button
                size={'icon-xs'}
                variant={categoryBreakdownChartType === 'income' ? 'default' : 'outline'}
                onClick={() => useFinanceStore.setState({ categoryBreakdownChartType: 'income' })}
              >
                <BanknoteArrowDown />
              </Button>
            </HoverTooltip>
            <span className="bg-primary text-primary-foreground p-1 px-2 rounded-md text-xs">
              {date.getFullYear()}
            </span>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        {categoryBreakdownChartType === 'expense' ? (
          <ExpenseChart chartData={expenseCategoryData} categories={expenseCategories} />
        ) : (
          <IncomeChart chartData={incomeCategoryData} categories={incomeCategories} />
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
