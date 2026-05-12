'use server'

import { createClient } from "@/lib/supabase/server";

export async function createParticipant(tournamentId: string, participantName: string) {
    const supabase = await createClient()
    var { data: participant, error } = await supabase.from('participant').insert({ name: participantName }).select()
    if(error) throw error
    var { error } = await supabase.from('tournament_participant').insert({ participant_id: participant[0].id, tournament_id: tournamentId })
    if(error) throw error
}

export async function deleteParticipant(id: string) {
    const supabase = await createClient()
    const { error: tpError } = await supabase.from('tournament_participant').delete().eq('participant_id', id)
    if(tpError) throw tpError
    const { error } = await supabase.from('participant').delete().eq('id', id)
    if(error) throw error
}