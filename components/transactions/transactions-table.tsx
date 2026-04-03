import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { capitalize } from '@/lib/utils';
import { Transaction } from '@/types';

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-6">No transactions found</div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="text-xs lg:text-base">
        {transactions.map((txn, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{new Date(txn.date).toLocaleDateString()}</TableCell>

            <TableCell>{capitalize(txn.category)}</TableCell>

            <TableCell
              className={
                txn.type === 'income'
                  ? 'text-green-500 font-medium'
                  : txn.type === 'expense'
                    ? 'text-red-500 font-medium'
                    : 'text-blue-500 font-medium'
              }
            >
              {capitalize(txn.type)}
            </TableCell>

            <TableCell>{capitalize(txn.name)}</TableCell>

            <TableCell>
              {txn.type === 'income' || txn.type === 'balance' ? '+' : '-'}${txn.amount}
            </TableCell>

            <TableCell>{txn.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
