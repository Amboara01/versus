'use client'

import { Button } from '@/components/ui/button'
import { formatLabel } from '@/utils/tournaments'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'

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
            return formatLabel(format)
        }
    },
    {
        accessorKey: 'scheduled_at',
        header: 'Scheduled at',
        cell: ({ row }) => format(row.getValue('scheduled_at'), 'PPP')
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const tournament = row.original

            return (
                <Link href={`/tournaments/${tournament.id}`}>
                    <Button variant='outline'>
                        <EyeIcon></EyeIcon>
                    </Button>
                </Link>
            )
        }
    }
]