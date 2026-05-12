'use client'

import { deleteParticipant } from "@/app/actions/participants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteDialog({ id }: { id: string }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    async function onSubmit() {
        await deleteParticipant(id)
        setOpen(false)
        router.refresh()
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <Trash2Icon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Remove Participant</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove this participant?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}