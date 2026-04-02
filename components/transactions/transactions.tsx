import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import TransactionsTable from './transactions-table';
import { Transaction } from '@/types';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  const [search, setSearch] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(transactions, {
      keys: ['name', 'category', 'note'],
      threshold: 0.4
    });
  }, [transactions]);

  const filteredTransactions =
    search.trim() === '' ? transactions : fuse.search(search).map((result) => result.item);

  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search your transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>
          <Filter />
        </Button>
      </div>
      <TransactionsTable transactions={filteredTransactions} />
    </>
  );
};

export default Transactions;
