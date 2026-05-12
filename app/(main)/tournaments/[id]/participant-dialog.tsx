'use client'

import { createParticipant } from "@/app/actions/participants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from 'react-hook-form'

export function AddParticipantDialog({ id }: { id: string }) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    async function onSubmit(data: { name: string }) {
        console.log(watch('name'))
        await createParticipant(id, data.name)
        reset()
        setOpen(false)
        router.refresh()
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Participant</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Participant</DialogTitle>
                    <DialogDescription>
                        Provide a name to register a new participant
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name', { required: true })} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}