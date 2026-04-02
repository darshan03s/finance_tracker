import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

type Transaction = {
  date: string;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
  note: string;
};

const transactions: Transaction[] = [
  {
    date: '2026-04-01',
    category: 'Salary',
    type: 'Income',
    amount: 5000,
    note: 'Monthly salary'
  },
  {
    date: '2026-04-02',
    category: 'Food',
    type: 'Expense',
    amount: 250,
    note: 'Dinner outside'
  },
  {
    date: '2026-04-03',
    category: 'Rent',
    type: 'Expense',
    amount: 1500,
    note: 'April rent'
  },
  {
    date: '2026-04-04',
    category: 'Freelance',
    type: 'Income',
    amount: 800,
    note: 'Client project'
  },
  {
    date: '2026-04-05',
    category: 'Entertainment',
    type: 'Expense',
    amount: 120,
    note: 'Movie night'
  }
];

const Transactions = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((txn, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{txn.date}</TableCell>

            <TableCell>{txn.category}</TableCell>

            <TableCell
              className={
                txn.type === 'Income' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'
              }
            >
              {txn.type}
            </TableCell>

            <TableCell>
              {txn.type === 'Income' ? '+' : '-'}${txn.amount}
            </TableCell>

            <TableCell>{txn.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Transactions;
