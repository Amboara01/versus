'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { EyeIcon } from 'lucide-react'

const ELIMINATION_TYPES: Record<string, string> = {
    'single_elimination': 'Single Elimination',
    'double_elimination': 'Double Elimination',
    'round_robin': 'Round Robin',
}

export type TournamentRow = {
    id: string
    title: string
    format: string
    scheduled_at: string
}

export const columns: ColumnDef<TournamentRow>[] = [
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'format',
        header: 'Elimination type',
        cell: ({ row }) => {
            const format: string = row.getValue('format')
            if(format in ELIMINATION_TYPES)
                return ELIMINATION_TYPES[format]
            return 'Type Invalide.'
        }
    },
    {
        accessorKey: 'scheduled_at',
        header: 'Scheduled at',
        cell: ({ row }) => format(row.getValue('scheduled_at'), 'PPP')
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <Button variant='outline'>
                <EyeIcon></EyeIcon>
            </Button>
        )
    }
]