'use client'

import { launchTournament } from "@/app/actions/tournaments";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TournamentRow = Database['public']['Tables']['tournament']['Row']

export default function LaunchDialog({ tournament, participants }: { tournament: TournamentRow, participants: any[] }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const canBeLaunched = participants.length && participants.length > 2

    async function onSubmit() {
        await launchTournament(tournament, participants)
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    title="Add more participants to launch tournament"
                    disabled={!canBeLaunched}
                >
                    Launch
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Launch tournament</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to launch this tournament?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit}>Launch</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}