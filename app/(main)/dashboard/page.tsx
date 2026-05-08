import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="flex justify-between">
            <h1>Dashboard</h1>
            <Button asChild variant={"outline"}>
                <Link className="" href='/tournaments/create'>Nouveau Tournoi</Link>
            </Button>
        </div>
    )
}