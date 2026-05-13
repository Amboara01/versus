import { launchTournament } from "@/app/actions/tournaments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { formatLabel } from "@/utils/tournaments";
import { format } from "date-fns";
import { CalendarIcon, Dice5Icon, SwordsIcon, UsersRoundIcon } from "lucide-react";
import LaunchDialog from "./launch-dialog";

type TournamentRow = Database['public']['Tables']['tournament']['Row']

export default async function TournamentCard({ tournament, participants }: { tournament: TournamentRow, participants: any[] }) {

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-4 items-center">
                        <span>{tournament.title}</span>
                        <Badge>{tournament.status}</Badge>
                    </CardTitle>
                    <CardDescription>{tournament.description}</CardDescription>
                    {
                        tournament.status == 'draft' ? (
                            <CardAction>
                                <LaunchDialog tournament={tournament} participants={participants} />
                            </CardAction>
                        ) : null
                    }
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex space-x-2">
                            <UsersRoundIcon></UsersRoundIcon>
                            <span>
                                {participants.length < 2 ? `${participants.length} player` : `${participants.length} players`}
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
                                {format(tournament.scheduled_at ? new Date(tournament.scheduled_at) : new Date(), 'PPP')}
                            </span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}