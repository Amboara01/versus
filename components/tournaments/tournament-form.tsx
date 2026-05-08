'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { format } from 'date-fns'

const NewTournamentForm = () => {
    const [date, setDate] = useState<Date>()

    return (
        <form>
            <div className='mb-8 space-y-2'>
                <h2 className='text-xl font-semibold'>New Tournament</h2>
                <p className='text-muted-foreground'>
                    Please provide the tournament's informations to create it.
                    Then you will be asked to add and seed participants before launching it.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title' placeholder='World Chess Championship' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='type'>Type</Label>
                    <Select>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Elimination Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="single_elimination">Single Elimination</SelectItem>
                                <SelectItem value="double_elimination">Double Elimination</SelectItem>
                                <SelectItem value="round_robin">Round Robin</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='game'>Game</Label>
                    <Input id='game' placeholder='Chess, Basketball, Dota 2' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='scheduled_at'>Starts at</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id='scheduled_at'
                                variant="outline"
                                data-empty={!date}
                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                defaultMonth={date}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex flex-col items-start gap-2 sm:col-span-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea id='description' placeholder='Tell us more about this championship'></Textarea>
                </div>
            </div>

            <div className='mt-8 flex justify-end'>
                <Button type='submit'>Save Information</Button>
            </div>
        </form>
    )
}

export default NewTournamentForm
