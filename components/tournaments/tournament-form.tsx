'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format, formatISO } from 'date-fns'
import { createTournament } from '@/app/actions/tournaments'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TournamentFormData, tournamentSchema } from '@/lib/schemas/tournament'

const NewTournamentForm = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(tournamentSchema)
    })
    
    async function onSubmit(data: TournamentFormData) {
        await createTournament(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Input id='title' {...register('title')} placeholder='World Chess Championship' />
                    {errors.title && <p className='text-sm text-red-500' role='alert'>{errors.title.message}</p>}
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='type'>Type</Label>
                    <Controller
                        name='format'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
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
                        )}
                    />
                    {errors.format && <p className='text-sm text-red-500' role='alert'>{errors.format.message}</p>}
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='game'>Game</Label>
                    <Input id='game' {...register('game')} placeholder='Chess, Basketball, Dota 2' />
                    {errors.game && <p className='text-sm text-red-500' role='alert'>{errors.game.message}</p>}
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='scheduled_at'>Starts at</Label>
                    <Controller
                        name='scheduled_at'
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id='scheduled_at'
                                        variant="outline"
                                        data-empty={!field.value}
                                        className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        defaultMonth={field.value}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.scheduled_at && <p className='text-sm text-red-500' role='alert'>{errors.scheduled_at.message}</p>}
                </div>
                <div className='flex flex-col items-start gap-2 sm:col-span-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea id='description' {...register('description')} placeholder='Tell us more about this championship'></Textarea>
                    {errors.description && <p className='text-sm text-red-500' role='alert'>{errors.description.message}</p>}
                </div>
            </div>

            <div className='mt-8 flex justify-end'>
                <Button type='submit'>Save Information</Button>
            </div>
        </form>
    )
}

export default NewTournamentForm
