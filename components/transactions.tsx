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

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
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
            <TableCell className="font-medium">{new Date(txn.date).toLocaleDateString()}</TableCell>

            <TableCell>{capitalize(txn.category)}</TableCell>

            <TableCell
              className={
                txn.type === 'income' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'
              }
            >
              {capitalize(txn.type)}
            </TableCell>

            <TableCell>
              {txn.type === 'income' ? '+' : '-'}${txn.amount}
            </TableCell>

            <TableCell>{txn.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Transactions;
