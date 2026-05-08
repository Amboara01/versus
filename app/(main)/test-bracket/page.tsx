'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { InMemoryDatabase } from 'brackets-memory-db'
import { BracketsManager } from "brackets-manager";
import { useEffect, useRef } from "react";
import "brackets-viewer/dist/brackets-viewer.min.css"

declare global {
    interface Window {
        bracketsViewer: any
    }
}

export default function CreateTournament() {
    const managerRef = useRef<BracketsManager>(new BracketsManager(new InMemoryDatabase()))
    useEffect(() => {
        import('brackets-viewer/dist/brackets-viewer.min.js')
    }, [])
    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        if (managerRef.current) {
            await managerRef.current.create.stage({
                tournamentId: 1,
                name: 'Quarter Finals',
                type: 'single_elimination',
                seeding: ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', null, null],
                settings: {
                    size: 8,
                    seedOrdering: ['inner_outer'],
                    balanceByes: true,
                },
            })

            const data = await managerRef.current.get.tournamentData(1)

            window.bracketsViewer.render({
                stages: data.stage,
                matches: data.match,
                matchGames: data.match_game,
                participants: data.participant,
            }, { clear: true })
        }
    }

    return (
        <div className='py-8 sm:py-16 lg:py-24'>
            <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
                <form onSubmit={onSubmit}>
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
                                <SelectContent id="type">
                                    <SelectGroup>
                                        <SelectItem value="single_elimination">Single Elimination</SelectItem>
                                        <SelectItem value="double_elimination">Double Elimination</SelectItem>
                                        <SelectItem value="round_robin">Round Robin</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col items-start gap-2'>
                            <Label htmlFor='size'>Size</Label>
                            <Input id='size' placeholder='Number of teams' />
                        </div>
                    </div>

                    <div className='mt-8 flex justify-end'>
                        <Button type='submit'>Save Information</Button>
                    </div>
                </form>
                <div className="brackets-viewer"></div>
            </div>
        </div>
    )
}