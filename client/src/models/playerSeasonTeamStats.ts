import TeamId from './teamId'

class PlayerSeasonTeamStats {
    readonly teamId: TeamId
    readonly age: number
    readonly gamesPlayed: number
    readonly gamesStarted: number
    readonly minutes: number
    readonly fieldGoalsMade: number
    readonly fieldGoalsAttempted: number
    readonly threePointersMade: number
    readonly threePointersAttempted: number
    readonly freeThrowsMade: number
    readonly freeThrowsAttempted: number
    readonly offensiveRebounds: number
    readonly defensiveRebounds: number
    readonly assists: number
    readonly steals: number
    readonly blocks: number
    readonly turnovers: number
    readonly personalFouls: number

    get twoPointersMade(): number {
        return this.fieldGoalsMade - this.threePointersMade
    }

    get twoPointersAttempted(): number {
        return this.fieldGoalsAttempted - this.threePointersAttempted
    }

    get points(): number {
        return this.freeThrowsMade + this.twoPointersMade * 2 + this.threePointersMade * 3
    }

    get rebounds(): number {
        return this.offensiveRebounds + this.defensiveRebounds
    }

    constructor(teamId: TeamId, age: number, gamesPlayed: number, gamesStarted: number, minutes: number, fieldGoalsMade: number, fieldGoalsAttempted: number, threePointersMade: number, threePointersAttempted: number, freeThrowsMade: number, freeThrowsAttempted: number, offensiveRebounds: number, defensiveRebounds: number, assists: number, steals: number, blocks: number, turnovers: number, personalFouls: number) {
        this.teamId = teamId
        this.age = age
        this.gamesPlayed = gamesPlayed
        this.gamesStarted = gamesStarted
        this.minutes = minutes
        this.fieldGoalsMade = fieldGoalsMade
        this.fieldGoalsAttempted = fieldGoalsAttempted
        this.threePointersMade = threePointersMade
        this.threePointersAttempted = threePointersAttempted
        this.freeThrowsMade = freeThrowsMade
        this.freeThrowsAttempted = freeThrowsAttempted
        this.offensiveRebounds = offensiveRebounds
        this.defensiveRebounds = defensiveRebounds
        this.assists = assists
        this.steals = steals
        this.blocks = blocks
        this.turnovers = turnovers
        this.personalFouls = personalFouls
    }
}

export default PlayerSeasonTeamStats