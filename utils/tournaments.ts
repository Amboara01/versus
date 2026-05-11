const ELIMINATION_TYPES: Record<string, string> = {
    'single_elimination': 'Single Elimination',
    'double_elimination': 'Double Elimination',
    'round_robin': 'Round Robin',
}

export function formatLabel(format: string) {
    if (format in ELIMINATION_TYPES)
        return ELIMINATION_TYPES[format]
    return 'Type Invalide.'
}