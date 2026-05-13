import { Card } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Trash2Icon, UsersRoundIcon } from "lucide-react";
import { AddParticipantDialog } from "./participant-dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteDialog from "./delete-dialog";

export function ParticipantsCard({ tournament, participants }: { tournament: { id: string, status: string }, participants: any }) {
    return (
        <Card className="p-4">
            {
                participants.length
                    ? (
                        <Table>
                            <TableCaption className="space-y-4">
                                <p>
                                    A list of the tournament's participants
                                </p>
                                { tournament.status == 'draft' && <AddParticipantDialog id={tournament.id} />}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    participants.map((participant: any) => (
                                        <TableRow key={participant.participant.id}>
                                            <TableCell>
                                                {participant.participant.name}
                                            </TableCell>
                                            <TableCell className="flex justify-end">
                                                { tournament.status == 'draft' && <DeleteDialog id={participant.participant.id}/> }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
                    : (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <UsersRoundIcon></UsersRoundIcon>
                                </EmptyMedia>
                                <EmptyTitle>No participants</EmptyTitle>
                                <EmptyDescription>There are no participants to this tournament yet. Please add some before launching it.</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <AddParticipantDialog id={tournament.id} />
                            </EmptyContent>
                        </Empty>
                    )
            }

        </Card>
    )
}