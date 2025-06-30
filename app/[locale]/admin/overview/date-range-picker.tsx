'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { cn, formatDateTime } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { PopoverClose } from '@radix-ui/react-popover'

export function CalendarDateRangePicker({
  defaultDate,
  setDate,
  className,
}: {
  defaultDate?: { from: Date; to: Date } | undefined
  setDate: React.Dispatch<
    React.SetStateAction<{ from: Date; to: Date } | undefined>
  >
  className?: string
}) {
  const [calendarDate, setCalendarDate] = React.useState<
    [Date | null, Date | null]
  >([defaultDate?.from || null, defaultDate?.to || null])

  const [startDate, endDate] = calendarDate

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setCalendarDate(dates)
  }

  const applyDate = () => {
    if (startDate && endDate) {
      setDate({ from: startDate, to: endDate })
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !startDate && !endDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {startDate ? (
              endDate ? (
                <>
                  {formatDateTime(startDate).dateOnly} -{' '}
                  {formatDateTime(endDate).dateOnly}
                </>
              ) : (
                formatDateTime(startDate).dateOnly
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onCloseAutoFocus={() =>
            setCalendarDate([
              defaultDate?.from || null,
              defaultDate?.to || null,
            ])
          }
          className='w-auto p-0'
          align='end'
        >
          <div className='p-3'>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              monthsShown={2} // Equivalent to numberOfMonths={2}
              inline // Keeps calendar always visible in popover
              className='border-none'
            />
          </div>
          <div className='flex gap-4 p-4 pt-0'>
            <PopoverClose asChild>
              <Button onClick={applyDate}>Apply</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
