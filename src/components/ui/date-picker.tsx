'use client';

import {format} from 'date-fns';
import {ChevronDownIcon} from 'lucide-react';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

interface DatePickerProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export function DatePicker({value, onChange}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="justify-between font-normal"
        >
          {value ? format(value, 'dd/MM/yyyy') : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          captionLayout="dropdown"
          onSelect={date => {
            onChange(date?.toISOString());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
