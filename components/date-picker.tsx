import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { useDateStore } from '@/stores/date-store';
import { Calendar as CalenderIcon } from 'lucide-react';

const DatePicker = () => {
  const date = useDateStore((s) => s.date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="flex items-center gap-2">
          <CalenderIcon className="size-3 sm:size-4" />
          <span className="pt-1">{date ? new Date(date).toLocaleDateString() : 'Pick a date'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 m-0 w-fit">
        <Calendar
          onSelect={(selectedDate) => useDateStore.setState({ date: selectedDate })}
          selected={date}
          defaultMonth={date ?? new Date()}
          mode="single"
          disabled={(date) => date > new Date()}
          className="rounded-lg border"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
