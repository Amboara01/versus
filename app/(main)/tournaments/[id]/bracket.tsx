'use client'

import { Card } from "@/components/ui/card";
import { useEffect } from "react";

declare global {
    interface Window {
        bracketsViewer: any
    }
}

export default function BracketViewerCard({ data }: { data: any }) {
    useEffect(() => {
        init()
    }, [data])

    async function init() {
        await import('brackets-viewer/dist/brackets-viewer.min.css')
        await import('brackets-viewer/dist/brackets-viewer.min.js')
        
        render()
    }
    function render() {
        window.bracketsViewer.render({
            stages: data.stage,
            matches: data.match,
            matchGames: data.match_game,
            participants: data.participant,
        }, { clear: true })
    }

    return (
        <Card className="p-4">
            <div className="brackets-viewer"></div>
        </Card>
    )
}