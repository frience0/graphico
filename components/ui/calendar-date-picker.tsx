'use client'

import * as React from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
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
    const [start, end] = calendarDate
    if (start && end) {
      setDate({ from: start, to: end })
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
              monthsShown={2} // Matches Shadcn's numberOfMonths={2}
              inline // Always visible in popover
              calendarClassName='border-none'
              dayClassName={(date) => {
                const isSelected =
                  startDate && endDate && date >= startDate && date <= endDate
                const isToday =
                  date.toDateString() === new Date().toDateString()
                const isRangeStart =
                  startDate && date.toDateString() === startDate.toDateString()
                const isRangeEnd =
                  endDate && date.toDateString() === endDate.toDateString()
                const isRangeMiddle =
                  startDate && endDate && date > startDate && date < endDate
                const isOutside =
                  date.getMonth() !== (startDate || new Date()).getMonth()

                return cn(
                  'size-8 p-0 font-normal text-sm text-center rounded-md',
                  isSelected && 'bg-primary text-primary-foreground',
                  isRangeStart &&
                    'rounded-l-md bg-primary text-primary-foreground',
                  isRangeEnd &&
                    'rounded-r-md bg-primary text-primary-foreground',
                  isRangeMiddle && 'bg-accent text-accent-foreground',
                  isToday && !isSelected && 'bg-accent text-accent-foreground',
                  isOutside && 'text-muted-foreground',
                  !isSelected &&
                    'hover:bg-primary hover:text-primary-foreground'
                )
              }}
              renderCustomHeader={({
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
                monthDate,
              }) => (
                <div className='flex justify-center pt-1 relative items-center w-full'>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className={cn(
                      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1'
                    )}
                  >
                    <ChevronLeft className='size-4' />
                  </button>
                  <span className='text-sm font-medium'>
                    {monthDate.toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className={cn(
                      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1'
                    )}
                  >
                    <ChevronRight className='size-4' />
                  </button>
                </div>
              )}
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
