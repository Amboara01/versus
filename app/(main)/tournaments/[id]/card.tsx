import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { formatLabel } from "@/utils/tournaments";
import { format } from "date-fns";
import { CalendarIcon, Dice5Icon, SwordsIcon, UsersRoundIcon } from "lucide-react";

export default async function TournamentCard({ params }: { params: Promise<{id: string}>}) {
    const { id } = await params
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('tournament')
        .select('title, game, format, bracket_data, scheduled_at, description, status')
        .eq('id', id)
    if (error) throw error
    const tournament = data[0]

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>{tournament.title}</span>
                        <Badge>{tournament.status}</Badge>
                    </CardTitle>
                    <CardDescription>{tournament.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex space-x-2">
                            <UsersRoundIcon></UsersRoundIcon>
                            <span>
                                {tournament.bracket_data ? -1 : 0}
                                players
                            </span>
                        </li>
                        <li className="flex space-x-2">
                            <SwordsIcon></SwordsIcon>
                            <span>
                                {formatLabel(tournament.format)}
                            </span>
                        </li>
                        <li className="flex space-x-2">
                            <Dice5Icon></Dice5Icon>
                            <span>
                                {tournament.game}
                            </span>
                        </li>
                        <li className="flex space-x-2">
                            <CalendarIcon></CalendarIcon>
                            <span>
                                { format(tournament.scheduled_at ? new Date(tournament.scheduled_at) : new Date(), 'PPP')}
                            </span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}