import { Suspense } from "react"
import TournamentCard from "./card"

export default async function TournamentDetails({ params }: { params: Promise<{id: string}>}) {
    return (
        <>
            <Suspense fallback="Loading...">
                <TournamentCard params={params}></TournamentCard>
            </Suspense>
        </>
    )
}