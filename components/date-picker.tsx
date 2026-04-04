import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { useDateStore } from '@/stores/date-store';

const DatePicker = () => {
  const date = useDateStore((s) => s.date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>
          {date ? new Date(date).toLocaleDateString() : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 m-0 w-fit">
        <Calendar
          onSelect={(selectedDate) => useDateStore.setState({ date: selectedDate })}
          selected={date}
          mode="single"
          className="rounded-lg border"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
