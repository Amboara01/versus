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

export function seed(participants: any[]) {
    const numParticipants = participants.length
    let quotient = numParticipants
    let power = 0
    let isPowerOfTwo = 0
    let remainder = 0
    while(quotient > 0) {
        remainder = quotient%2
        quotient = (quotient-remainder)/2
        if(remainder > 0) isPowerOfTwo++
        power++
    }
    const size = isPowerOfTwo == 1 ? 2**(power-1) : 2*power
    const seeding = [...participants].concat(new Array(size-numParticipants).fill(null))
    return { size, seeding }
}