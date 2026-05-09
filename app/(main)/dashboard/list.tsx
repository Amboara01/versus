import { createClient } from "@/lib/supabase/server"
import { Database } from "@/lib/database.types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Tournament = Database['public']['Tables']['tournament']['Row']

export default async function TournamentList() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('tournament').select()
    if (error) throw error

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
            />
        </>
    )
}