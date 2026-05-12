import { Suspense } from "react"
import { TournamentDetailsContent } from "./details"

export default async function TournamentDetails({ params }: { params: Promise<{id: string}>}) {
    return (
        <>
            <Suspense fallback="Loading...">
                <TournamentDetailsContent params={params} />
            </Suspense>
        </>
    )
}