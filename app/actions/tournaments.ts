'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/lib/database.types"
import { TournamentFormData, tournamentSchema } from "@/lib/schemas/tournament"
import { redirect } from "next/navigation"

type TournamentInsert = Database['public']['Tables']['tournament']['Insert']

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