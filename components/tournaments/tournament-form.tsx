import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const NewTournamentForm = () => {
    return (
        <form>
            <div className='mb-8 space-y-2'>
                <h2 className='text-xl font-semibold'>New Tournament</h2>
                <p className='text-muted-foreground'>
                    Please provide the tournament's informations to create it.
                    Then you will be asked to add and seed participants before launching it.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-first-name'>Title</Label>
                    <Input id='multi-step-personal-info-first-name' placeholder='World Chess Championship' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-last-name'>Host</Label>
                    <Select>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Elimination Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="single_elimination">Single Elimination</SelectItem>
                                <SelectItem value="double_elimination">Double Elimination</SelectItem>
                                <SelectItem value="round_robin">Round Robin</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-mobile'>Mobile</Label>
                    <Input id='multi-step-personal-info-mobile' placeholder='+1 (555) 123-4567' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-pincode'>Pincode</Label>
                    <Input id='multi-step-personal-info-pincode' placeholder='Postal Code' />
                </div>
                <div className='flex flex-col items-start gap-2 sm:col-span-2'>
                    <Label htmlFor='multi-step-personal-info-address'>Address</Label>
                    <Input id='multi-step-personal-info-address' placeholder='123 Main St' />
                </div>
                <div className='flex flex-col items-start gap-2 sm:col-span-2'>
                    <Label htmlFor='multi-step-personal-info-landmark'>Landmark</Label>
                    <Input id='multi-step-personal-info-landmark' placeholder='Near Central Park, New York' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-city'>City</Label>
                    <Input id='multi-step-personal-info-city' placeholder='New York' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <Label htmlFor='multi-step-personal-info-state'>State</Label>
                    <Input id='multi-step-personal-info-state' placeholder='NY' />
                </div>
            </div>

            <div className='mt-8 flex justify-end'>
                <Button type='submit'>Save Information</Button>
            </div>
        </form>
    )
}

export default NewTournamentForm
