import { z } from 'zod'

export const tournamentSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    format: z.enum(['single_elimination', 'double_elimination', 'round_robin']),
    game: z.string().min(1, 'Game is required'),
    scheduled_at: z.date({ error: 'Please pick a date' }),
    description: z.string().optional(),
})

export type TournamentFormData = z.infer<typeof tournamentSchema>