'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/lib/database.types"
import { TournamentFormData, tournamentSchema } from "@/lib/schemas/tournament"
import { redirect } from "next/navigation"
import { InMemoryDatabase } from "brackets-memory-db"
import { BracketsManager } from "brackets-manager"
import { seed } from "@/utils/tournaments"

type TournamentInsert = Database['public']['Tables']['tournament']['Insert']
type TournamentRow = Database['public']['Tables']['tournament']['Row']

export async function createTournament(data: TournamentFormData) {
    const parsed = tournamentSchema.safeParse(data)
    if(!parsed.success) throw new Error(parsed.error.message)

    const supabase = await createClient()
    const { data: user } = await supabase.auth.getClaims()
    if(!user) throw new Error('Unauthorized')

    const payload: TournamentInsert = {
        ...parsed.data,
        scheduled_at: parsed.data.scheduled_at.toISOString(),
        host_id: user.claims.sub
    }
    const { error } = await supabase.from('tournament').insert(payload)
    if (error) throw error
    redirect('/dashboard')
}

export async function launchTournament(tournament: TournamentRow, participants: any[]) {
    const storage = new InMemoryDatabase()
    const manager = new BracketsManager(storage)
    const { size, seeding } = seed(participants)

    await manager.create.stage({
        tournamentId: tournament.id,
        name: tournament.title,
        type: tournament.format,
        seeding: seeding,
        settings: {
            size,
            seedOrdering: ['inner_outer'],
            balanceByes: true
        }
    })
    
    const data = await manager.get.tournamentData(tournament.id)
    const supabase = await createClient()
    const { error } = await supabase.from('tournament').update({ bracket_data: data }).eq('id', tournament.id)
    if(error) throw error
}