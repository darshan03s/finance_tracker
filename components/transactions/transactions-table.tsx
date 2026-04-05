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
import { ConfirmDialog } from '../wrappers';

function bg(cat: string) {
  if (cat === 'food') return '#f59e0b';
  if (cat === 'rent') return '#ef4444';
  if (cat === 'misc') return '#a855f7';
  if (cat === 'salary') return '#3b82f6';
  if (cat === 'freelance') return '#10b981';
  if (cat === 'balance') return '#155dfc';
}

function getDeleteDescription(txn: Transaction) {
  return `${capitalize(txn.type)} "${capitalize(txn.name)}" (${capitalize(
    txn.category
  )}) of ₹${formatCurrency(txn.amount)} will be deleted.`;
}

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

            <TableCell>
              <span
                className={`text-white p-1 px-2 rounded-full`}
                style={{ backgroundColor: bg(txn.category) }}
              >
                {capitalize(txn.category)}
              </span>
            </TableCell>

            <TableCell>
              <span
                className={`p-1 px-2 rounded-full text-white
                  ${txn.type === 'income' ? 'bg-green-600' : txn.type === 'expense' ? 'bg-red-600' : 'bg-blue-600'}
                  `}
              >
                {capitalize(txn.type)}
              </span>
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
                  <ConfirmDialog
                    title={`Are you sure you want to delete this transaction?`}
                    description={getDeleteDescription(txn)}
                    onSuccess={() => {
                      handleDeleteTransaction(txn);
                    }}
                  >
                    <Button variant="destructive" size="icon-sm">
                      <Trash />
                    </Button>
                  </ConfirmDialog>
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
