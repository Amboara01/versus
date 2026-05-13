import { createClient } from "@/lib/supabase/server"
import TournamentCard from "./card"
import { ParticipantsCard } from "./participants"
import BracketViewerCard from "./bracket"

export async function TournamentDetailsContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    var { data: tournament, error } = await supabase
        .from('tournament')
        .select('id, title, game, format, bracket_data, scheduled_at, description, status')
        .eq('id', id)
        .single()
    if (error) throw error
    var { data: participants, error } = await supabase
        .from('tournament_participant')
        .select(`tournament_id, participant (id, name)`)
        .eq('tournament_id', id)

    return (
        <div className="flex flex-col space-y-4">
            <TournamentCard tournament={tournament} participants={participants} />
            <ParticipantsCard tournament={tournament} participants={participants}/>
            { tournament?.status != 'draft' && <BracketViewerCard /> }
        </div>
    )
}