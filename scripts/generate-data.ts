import { writeFile } from 'fs/promises';
import crypto from 'crypto';

type Transaction = {
  id: string;
  name: string;
  date: string;
  type: 'income' | 'expense' | 'balance';
  category: string;
  amount: number;
  note: string;
};

const expenseCategories = ['food', 'rent', 'misc'] as const;
const incomeCategories = ['salary', 'freelance'] as const;

const expenseNames = [
  'Swiggy order',
  'Zomato dinner',
  'Uber ride',
  'Grocery shopping',
  'Electricity bill',
  'Internet recharge',
  'Movie tickets',
  'Amazon purchase',
  'Coffee shop',
  'Snacks and drinks',
  'Fuel refill',
  'Gym membership',
  'Clothing purchase'
];

const incomeNames = [
  'Monthly salary',
  'Freelance project',
  'Client payment',
  'Bonus payout',
  'Side project income',
  'Consulting fee'
];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(type: 'income' | 'expense', category: string) {
  if (type === 'income') {
    return Math.floor(Math.random() * 40000) + 10000;
  }

  if (category === 'rent') {
    return Math.floor(Math.random() * 15000) + 5000;
  }

  return Math.floor(Math.random() * 2000) + 100;
}

function randomDateBetween(start: Date, end: Date) {
  const time = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(time);
}

function generateTransactions(start: Date, end: Date): Transaction[] {
  const transactions: Transaction[] = [];

  transactions.push({
    id: crypto.randomUUID(),
    name: 'Balance Update',
    date: start.toISOString(),
    type: 'balance',
    category: 'balance',
    amount: 50000,
    note: ''
  });

  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalTransactions = days * 2;

  for (let i = 0; i < totalTransactions; i++) {
    const isIncome = Math.random() < 0.25;
    const type = isIncome ? 'income' : 'expense';

    const category = isIncome ? randomItem(incomeCategories) : randomItem(expenseCategories);

    const name = isIncome ? randomItem(incomeNames) : randomItem(expenseNames);

    const amount = randomAmount(type, category);

    const date = randomDateBetween(start, end);

    transactions.push({
      id: crypto.randomUUID(),
      name,
      date: date.toISOString(),
      type,
      category,
      amount,
      note: ''
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function main() {
  const [, , startArg, endArg] = process.argv;

  if (!startArg || !endArg) {
    console.error('Usage: generate-data <start-date> <end-date>');
    process.exit(1);
  }

  const start = new Date(startArg);
  const end = new Date(endArg);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid date format. Use YYYY-MM-DD');
    process.exit(1);
  }

  const transactions = generateTransactions(start, end);

  const output = {
    balance: 50000,
    categories: {
      income: ['salary', 'freelance'],
      expense: ['food', 'rent', 'misc']
    },
    transactions
  };

  await writeFile('generated-data.json', JSON.stringify(output, null, 2));

  console.log(`Generated ${transactions.length} transactions`);
}

main();
