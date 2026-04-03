import { Input } from '../ui/input';
import TransactionsTable from './transactions-table';
import { Filters, Transaction } from '@/types';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import FilterDropdown from './filter-dropdown';

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    type: [],
    categories: []
  });

  const fuse = useMemo(() => {
    return new Fuse(transactions, {
      keys: ['name', 'category', 'note'],
      threshold: 0.4
    });
  }, [transactions]);

  const filteredTransactions =
    search.trim() === '' ? transactions : fuse.search(search).map((result) => result.item);

  const result = filteredTransactions.filter((txn) => {
    const typeMatch =
      filters.type.length === 0 ||
      (txn.type !== 'balance' && filters.type.includes(txn.type as 'income' | 'expense'));

    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(txn.category);

    return typeMatch && categoryMatch;
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          className="text-xs sm:text-md"
          placeholder="Search your transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterDropdown setFilters={setFilters} filters={filters} />
      </div>
      <TransactionsTable transactions={result} />
    </>
  );
};

export default Transactions;
