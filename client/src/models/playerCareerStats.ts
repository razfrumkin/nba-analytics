import PlayerSeasonTeamStats from './playerSeasonTeamStats'
import SeasonId from './seasonId'

export type SeasonType = 'regularSeason' | 'postseason'
export type Period = 'allTime' | 'season'
export type Mode = 'total' | 'perGame'
export enum StatType {
    GamesPlayed = 'gamesPlayed',
    GamesStarted = 'gamesStarted',
    Minutes = 'minutes',
    FieldGoalsMade = 'fieldGoalsMade',
    FieldGoalsAttempted = 'fieldGoalsAttempted',
    FieldGoalPercent = 'fgPercent',
    ThreePointersMade = 'threePointersMade',
    ThreePointersAttempted = 'threePointersAttempted',
    ThreePointerPercent = '3pPercent',
    FreeThrowsMade = 'freeThrowsMade',
    FreeThrowsAttempted = 'freeThrowsAttempted',
    FreeThrowPercent = 'ftPercent',
    TwoPointersMade = 'twoPointersMade',
    TwoPointersAttempted = 'twoPointersAttempted',
    TwoPointerPercent = '2pPercent',
    Points = 'points',
    Rebounds = 'rebounds',
    Assists = 'assists',
    Steals = 'steals',
    Blocks = 'blocks',
    Turnovers = 'turnovers',
    PersonalFouls = 'personalFouls'
}

export enum ReboundType {
    Offensive = 'offensive',
    Defensive = 'defensive',
    All = 'all'
}
export function formatStatType(type: StatType): string {
    switch (type) {
        case StatType.GamesPlayed: return 'Games Played'
        case StatType.GamesStarted: return 'GamesStarted'
        case StatType.Minutes: return 'Minutes'
        case StatType.FieldGoalsMade: return 'FGM'
        case StatType.FieldGoalsAttempted: return 'FGA'
        case StatType.FieldGoalPercent: return 'FG%'
        case StatType.ThreePointersMade: return '3PM'
        case StatType.ThreePointersAttempted: return '3PA'
        case StatType.ThreePointerPercent: return '3P%'
        case StatType.FreeThrowsMade: return 'FTM'
        case StatType.FreeThrowsAttempted: return 'FTA'
        case StatType.FreeThrowPercent: return 'FT%'
        case StatType.TwoPointersMade: return '2PM'
        case StatType.TwoPointersAttempted: return '2PA'
        case StatType.TwoPointerPercent: return '2P%'
        case StatType.Points: return 'Points'
        case StatType.Rebounds: return 'Rebounds'
        case StatType.Assists: return 'Assists'
        case StatType.Steals: return 'Steals'
        case StatType.Blocks: return 'Blocks'
        case StatType.Turnovers: return 'Turnovers'
        case StatType.PersonalFouls: return 'Personal Fouls'
        default: return ''
    }
}

export function formatReboundType(type: ReboundType): string {
    switch (type) {
        case ReboundType.Offensive: return 'Offensive Rebounds'
        case ReboundType.Defensive: return 'Defensive Rebounds'
        case ReboundType.All: return 'All'
        default: return ''
    }
}

export interface StatsOptions {
    seasonType: SeasonType
    period: Period
    season?: SeasonId
    mode: Mode
    statType: PlayerCareerStats,
    reboundType?: ReboundType
}

class PlayerCareerStats {
    regularSeasons: { [seasonId: SeasonId]: PlayerSeasonTeamStats[] }
    postseasons: { [seasonId: SeasonId]: PlayerSeasonTeamStats }

    constructor(regularSeasons: { [seasonId: SeasonId]: PlayerSeasonTeamStats[] }, postseasons: { [seasonId: SeasonId]: PlayerSeasonTeamStats }) {
        this.regularSeasons = regularSeasons
        this.postseasons = postseasons
    }

    getTotalValuesBySeason(seasonType: SeasonType, seasonId: SeasonId, property: keyof PlayerSeasonTeamStats): number {
        if (seasonType === 'regularSeason') {
            let total = 0
            for (let index = 0; index < this.regularSeasons[seasonId].length; index += 1) {
                total += this.regularSeasons[seasonId][index][property]
            }
            return total
        }

        return this.postseasons[seasonId][property]
    }

    getTotalValues(seasonType: SeasonType, property: keyof PlayerSeasonTeamStats): number {
        if (seasonType === 'regularSeason') {
            let total = 0
            for (const seasonId in this.regularSeasons) {
                for (let index = 0; index < this.regularSeasons[seasonId].length; index += 1) {
                    total += this.regularSeasons[seasonId][index][property]
                }
            }
            return total
        }

        let total = 0
        for (const seasonId in this.postseasons) total += this.postseasons[seasonId][property]
        return total
    }

    getTotalGamesPlayed(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'gamesPlayed')
    }

    getTotalGamesStarted(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'gamesStarted')
    }

    getTotalMinutes(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'minutes')
    }

    getTotalFGM(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'fieldGoalsMade')
    }

    getTotalFGA(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'fieldGoalsAttempted')
    }

    getTotal3PM(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'threePointersMade')
    }

    getTotal3PA(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'threePointersAttempted')
    }

    getTotalFTM(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'freeThrowsMade')
    }

    getTotalFTA(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'freeThrowsAttempted')
    }

    getTotal2PM(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'twoPointersMade')
    }

    getTotal2PA(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'twoPointersAttempted')
    }

    getTotalPoints(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'points')
    }

    getTotalOffensiveRebounds(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'offensiveRebounds')
    }

    getTotalDefensiveRebounds(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'defensiveRebounds')
    }

    getTotalRebounds(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'rebounds')
    }

    getTotalAssists(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'assists')
    }

    getTotalSteals(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'steals')
    }

    getTotalBlocks(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'blocks')
    }

    getTotalTurnovers(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'turnovers')
    }

    getTotalPersonalFouls(seasonType: SeasonType): number {
        return this.getTotalValues(seasonType, 'personalFouls')
    }
}

export function generatePlayerCareerStats(rawStats: any): PlayerCareerStats {
    const stats = new PlayerCareerStats({}, {})

    rawStats['regular_season'].data.forEach((rawStat: any) => {
        if (rawStat[4] === 'TOT') return

        const seasonId = rawStat[1]

        const playerSeasonTeamStats = generatePlayerSeasonTeamStats(rawStat)
    
        if (seasonId in stats.regularSeasons) stats.regularSeasons[seasonId].push(playerSeasonTeamStats)
        else stats.regularSeasons[seasonId] = [playerSeasonTeamStats]
    })

    rawStats['post_season'].data.forEach((rawStat: any) => {
        const seasonId = rawStat[1]

        const playerSeasonTeamStats = generatePlayerSeasonTeamStats(rawStat)

        stats.postseasons[seasonId] = playerSeasonTeamStats
    })

    return stats
}

function generatePlayerSeasonTeamStats(rawStats: any): PlayerSeasonTeamStats {
    return new PlayerSeasonTeamStats(rawStats[3], rawStats[5], rawStats[6], rawStats[7], rawStats[8], rawStats[9], rawStats[10], rawStats[12], rawStats[13], rawStats[15], rawStats[16], rawStats[18], rawStats[19], rawStats[21], rawStats[22], rawStats[23], rawStats[24], rawStats[25])
}

export default PlayerCareerStats