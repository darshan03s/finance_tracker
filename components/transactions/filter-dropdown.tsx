import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { capitalize } from '@/lib/utils';
import { useFinanceStore } from '@/stores/finance-store';
import { Filters } from '@/types';
import { Filter } from 'lucide-react';

const FilterDropdown = ({
  filters,
  setFilters
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) => {
  const expenseCategories = useFinanceStore((s) => s.categories.expense);
  const incomeCategories = useFinanceStore((s) => s.categories.income);

  const allCategories = [...expenseCategories, ...incomeCategories];

  function toggleType(type: 'income' | 'expense') {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter((t) => t !== type) : [...prev.type, type]
    }));
  }

  function toggleCategory(category: string) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
    }));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Type</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => toggleType('income')}>
            <span className="flex items-center gap-2">
              {filters.type.includes('income') && '✓'}Income
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => toggleType('expense')}>
            <span className="flex items-center gap-2">
              {filters.type.includes('expense') && '✓'}Expense
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          {allCategories.map((cat) => (
            <DropdownMenuItem key={cat} onClick={() => toggleCategory(cat)}>
              <span className="flex items-center gap-2">
                {filters.categories.includes(cat) && '✓'}
                {capitalize(cat)}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            setFilters({
              type: [],
              categories: []
            })
          }
        >
          Clear filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
