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

const chartData = [
  { month: 'January', balance: 186 },
  { month: 'February', balance: 305 },
  { month: 'March', balance: 237 },
  { month: 'April', balance: 73 },
  { month: 'May', balance: 209 },
  { month: 'June', balance: 214 },
  { month: 'July', balance: 300 },
  { month: 'August', balance: 119 },
  { month: 'September', balance: 250 },
  { month: 'October', balance: 50 },
  { month: 'November', balance: 288 },
  { month: 'December', balance: 160 }
];

const chartConfig = {
  balance: {
    label: 'Balance',
    color: '#2563eb'
  }
} satisfies ChartConfig;

const ChartWrapper = () => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="balance" fill="var(--color-balance)" radius={0} />
      </BarChart>
    </ChartContainer>
  );
};

const BalanceTrend = () => {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Balance trend</CardTitle>
        <CardDescription>Your balance trends</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartWrapper />
      </CardContent>
    </Card>
  );
};

export default BalanceTrend;
