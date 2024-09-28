"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function DatePicker({ handleOnChange }: { handleOnChange: any }) {
    const [date, setDate] = useState<Date>()

    useEffect(() => {
        if (date) {
            console.log(date)
            handleOnChange({ name: 'dueDate', value: format(date, "yyyy-MM-dd") })
        }
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal rounded-xl z-10 relative border-1 border-black ",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    <div className="z-0 bg-black m-auto relative w-[94%] h-5 rounded-2xl bottom-4"></div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
