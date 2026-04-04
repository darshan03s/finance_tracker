import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { capitalize, formatCurrency } from '@/lib/utils';
import { useRoleStore } from '@/stores/role-store';
import { Transaction } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import EditTransactionDialog from './edit-transactions';
import { useFinanceStore } from '@/stores/finance-store';

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const role = useRoleStore((s) => s.role);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  if (transactions.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-6">No transactions found</div>
    );
  }

  function handleEditTransaction(txn: Transaction) {
    setEditDialogOpen(true);
    setEditingTransaction(txn);
  }

  function handleDeleteTransaction(txn: Transaction) {
    deleteTransaction(txn);
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
          {role === 'admin' && <TableHead>Edit</TableHead>}
          {role === 'admin' && <TableHead>Delete</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody className="text-xs lg:text-[13px]">
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
              {txn.type === 'income' || txn.type === 'balance' ? '+' : '-'}
              {formatCurrency(txn.amount)}
            </TableCell>

            <TableCell>{txn.note}</TableCell>

            {role === 'admin' && (
              <TableCell>
                {txn.type === 'balance' ? null : (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => {
                      handleEditTransaction(txn);
                    }}
                  >
                    <Pencil />
                  </Button>
                )}
              </TableCell>
            )}

            {role === 'admin' && (
              <TableCell>
                {txn.type === 'balance' ? null : (
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => handleDeleteTransaction(txn)}
                  >
                    <Trash />
                  </Button>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {editingTransaction && (
        <EditTransactionDialog
          key={editingTransaction.id}
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          txn={editingTransaction}
        />
      )}
    </Table>
  );
};

export default TransactionsTable;
