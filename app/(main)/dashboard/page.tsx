import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import TournamentList from "./list";

export default async function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h1>Dashboard</h1>
                <Button asChild variant={"outline"}>
                    <Link className="" href='/tournaments/create'>Nouveau Tournoi</Link>
                </Button>
            </div>
            <Suspense fallback={<p>Loading tournaments...</p>}>
                <TournamentList></TournamentList>
            </Suspense>
        </div>
    )
}