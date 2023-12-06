import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

enum StatType {
    Points = 'Points',
    Rebounds = 'Rebounds',
    Assists = 'Assists',
    Steals = 'Steals',
    Blocks = 'Blocks',
    Minutes = 'Minutes'
}

function getTwoPointersMade(fieldGoalsMade: number, threePointersMade: number): number {
    return fieldGoalsMade - threePointersMade
}

function getPoints(fieldGoalsMade: number, threePointersMade: number, freeThrowsMade: number): number {
    return freeThrowsMade + getTwoPointersMade(fieldGoalsMade, threePointersMade) * 2 + threePointersMade * 3
}

function sum(array: number[][]): number {
    return array.flat().reduce((previous, current) => {
        return previous + current
    })
}

const BarChartPage = () => {
    const [selectedMode, setSelectedMode] = useState<string>('Per Game')
    const [statType, setStatType] = useState<StatType>(StatType.Points)

    const generateData = (): number[] => {
        switch (statType) {
            case StatType.Points:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return getPoints(stat.fieldGoalsMade, stat.threePointersMade, stat.freeThrowsMade)
                    })
                })) / gamesPlayed]
            case StatType.Rebounds:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return stat.offensiveRebounds + stat.defensiveRebounds
                    })
                })) / gamesPlayed]
            case StatType.Assists:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return stat.assists
                    })
                })) / gamesPlayed]
            case StatType.Steals:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return stat.steals
                    })
                })) / gamesPlayed]
            case StatType.Blocks:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return stat.blocks
                    })
                })) / gamesPlayed]
            case StatType.Minutes:
                return [sum(Object.keys(stats).map(season => {
                    return stats[season].map(stat => {
                        return stat.minutes
                    })
                })) / gamesPlayed]
            default:
                return []
        }
    }

    const data = {
        labels: ['Kevin Durant'],
        datasets: [{
          label: `${statType} Per Game`,
          data: generateData(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }]
    }

    return (
        <div>
            <Bar style={{ width: '100%' }} data={data}/>

            <Dropdown onSelect={key => setSelectedMode(key ?? 'Per Game')}>
                <Dropdown.Toggle variant="primary">
                    {selectedMode}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey={'Per Game'}>Per Game</Dropdown.Item>
                    <Dropdown.Item eventKey={'Total'}>Total</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


            <Dropdown onSelect={key => setStatType(StatType[key as keyof typeof StatType])}>
                <Dropdown.Toggle variant="primary">
                    {statType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Object.keys(StatType).map(key => {
                        return <Dropdown.Item key={key} eventKey={key}>{key}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default BarChartPage

const kevinDurantStats = {
    "post_season": {
      "data": [
        [
          201142,
          "2009-10",
          "00",
          1610612760,
          "OKC",
          21.0,
          6,
          6,
          231.0,
          43,
          123,
          0.35,
          10,
          35,
          0.286,
          54,
          62,
          0.871,
          8,
          38,
          46,
          14,
          3,
          8,
          22,
          17,
          150
        ],
        [
          201142,
          "2010-11",
          "00",
          1610612760,
          "OKC",
          22.0,
          17,
          17,
          722.0,
          155,
          345,
          0.449,
          37,
          109,
          0.339,
          140,
          167,
          0.838,
          18,
          121,
          139,
          48,
          16,
          19,
          42,
          52,
          487
        ],
        [
          201142,
          "2011-12",
          "00",
          1610612760,
          "OKC",
          23.0,
          20,
          20,
          837.0,
          198,
          383,
          0.517,
          41,
          110,
          0.373,
          133,
          154,
          0.864,
          13,
          135,
          148,
          74,
          29,
          24,
          63,
          51,
          570
        ],
        [
          201142,
          "2012-13",
          "00",
          1610612760,
          "OKC",
          24.0,
          11,
          11,
          485.0,
          112,
          246,
          0.455,
          22,
          70,
          0.314,
          93,
          112,
          0.83,
          7,
          92,
          99,
          69,
          14,
          12,
          43,
          26,
          339
        ],
        [
          201142,
          "2013-14",
          "00",
          1610612760,
          "OKC",
          25.0,
          19,
          19,
          815.0,
          194,
          422,
          0.46,
          43,
          125,
          0.344,
          132,
          163,
          0.81,
          25,
          145,
          170,
          75,
          19,
          25,
          72,
          41,
          563
        ],
        [
          201142,
          "2015-16",
          "00",
          1610612760,
          "OKC",
          27.0,
          18,
          18,
          726.0,
          175,
          407,
          0.43,
          31,
          110,
          0.282,
          130,
          146,
          0.89,
          13,
          115,
          128,
          60,
          18,
          18,
          65,
          37,
          511
        ],
        [
          201142,
          "2016-17",
          "00",
          1610612744,
          "GSW",
          28.0,
          15,
          15,
          533.0,
          149,
          268,
          0.556,
          38,
          86,
          0.442,
          92,
          103,
          0.893,
          16,
          103,
          119,
          64,
          12,
          20,
          38,
          39,
          428
        ],
        [
          201142,
          "2017-18",
          "00",
          1610612744,
          "GSW",
          29.0,
          21,
          21,
          807.0,
          212,
          435,
          0.487,
          47,
          138,
          0.341,
          137,
          152,
          0.901,
          13,
          150,
          163,
          99,
          15,
          25,
          50,
          43,
          608
        ],
        [
          201142,
          "2018-19",
          "00",
          1610612744,
          "GSW",
          30.0,
          12,
          12,
          442.0,
          125,
          243,
          0.514,
          35,
          80,
          0.438,
          102,
          113,
          0.903,
          1,
          58,
          59,
          54,
          13,
          12,
          43,
          38,
          387
        ],
        [
          201142,
          "2020-21",
          "00",
          1610612751,
          "BKN",
          32.0,
          12,
          12,
          485.0,
          145,
          282,
          0.514,
          33,
          82,
          0.402,
          88,
          101,
          0.871,
          5,
          106,
          111,
          53,
          18,
          19,
          42,
          31,
          411
        ],
        [
          201142,
          "2021-22",
          "00",
          1610612751,
          "BKN",
          33.0,
          4,
          4,
          176.0,
          32,
          83,
          0.386,
          7,
          21,
          0.333,
          34,
          38,
          0.895,
          2,
          21,
          23,
          25,
          4,
          1,
          21,
          15,
          105
        ],
        [
          201142,
          "2022-23",
          "00",
          1610612756,
          "PHX",
          34.0,
          11,
          11,
          466.0,
          107,
          224,
          0.478,
          17,
          51,
          0.333,
          88,
          96,
          0.917,
          7,
          89,
          96,
          61,
          9,
          15,
          39,
          29,
          319
        ]
      ],
      "headers": [
        "PLAYER_ID",
        "SEASON_ID",
        "LEAGUE_ID",
        "TEAM_ID",
        "TEAM_ABBREVIATION",
        "PLAYER_AGE",
        "GP",
        "GS",
        "MIN",
        "FGM",
        "FGA",
        "FG_PCT",
        "FG3M",
        "FG3A",
        "FG3_PCT",
        "FTM",
        "FTA",
        "FT_PCT",
        "OREB",
        "DREB",
        "REB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "PF",
        "PTS"
      ]
    },
    "regular_season": {
      "data": [
        [
          201142,
          "2007-08",
          "00",
          1610612760,
          "SEA",
          19.0,
          80,
          80,
          2768.0,
          587,
          1366,
          0.43,
          59,
          205,
          0.288,
          391,
          448,
          0.873,
          70,
          278,
          348,
          192,
          78,
          75,
          232,
          122,
          1624
        ],
        [
          201142,
          "2008-09",
          "00",
          1610612760,
          "OKC",
          20.0,
          74,
          74,
          2885.0,
          661,
          1390,
          0.476,
          97,
          230,
          0.422,
          452,
          524,
          0.863,
          77,
          405,
          482,
          205,
          96,
          53,
          225,
          134,
          1871
        ],
        [
          201142,
          "2009-10",
          "00",
          1610612760,
          "OKC",
          21.0,
          82,
          82,
          3239.0,
          794,
          1668,
          0.476,
          128,
          351,
          0.365,
          756,
          840,
          0.9,
          105,
          518,
          623,
          231,
          112,
          84,
          271,
          171,
          2472
        ],
        [
          201142,
          "2010-11",
          "00",
          1610612760,
          "OKC",
          22.0,
          78,
          78,
          3038.0,
          711,
          1538,
          0.462,
          145,
          414,
          0.35,
          594,
          675,
          0.88,
          57,
          476,
          533,
          214,
          88,
          76,
          218,
          159,
          2161
        ],
        [
          201142,
          "2011-12",
          "00",
          1610612760,
          "OKC",
          23.0,
          66,
          66,
          2546.0,
          643,
          1297,
          0.496,
          133,
          344,
          0.387,
          431,
          501,
          0.86,
          40,
          487,
          527,
          231,
          88,
          77,
          248,
          133,
          1850
        ],
        [
          201142,
          "2012-13",
          "00",
          1610612760,
          "OKC",
          24.0,
          81,
          81,
          3119.0,
          731,
          1433,
          0.51,
          139,
          334,
          0.416,
          679,
          750,
          0.905,
          46,
          594,
          640,
          374,
          116,
          105,
          280,
          143,
          2280
        ],
        [
          201142,           // 0
          "2013-14",        // 1
          "00",             // 2
          1610612760,       // 3
          "OKC",            // 4
          25.0,             // 5
          81,               // 6
          81,               // 7
          3122.0,           // 8
          849,              // 9
          1688,             // 10
          0.503,            // 11
          192,              // 12
          491,              // 13
          0.391,            // 14
          703,              // 15
          805,              // 16
          0.873,            // 17
          58,               // 18
          540,              // 19
          598,              // 20
          445,              // 21
          103,              // 22
          59,               // 23
          285,              // 24
          174,              // 25
          2593              // 26
        ],
        [
          201142,
          "2014-15",
          "00",
          1610612760,
          "OKC",
          26.0,
          27,
          27,
          913.0,
          238,
          467,
          0.51,
          64,
          159,
          0.403,
          146,
          171,
          0.854,
          16,
          162,
          178,
          110,
          24,
          25,
          74,
          40,
          686
        ],
        [
          201142,
          "2015-16",
          "00",
          1610612760,
          "OKC",
          27.0,
          72,
          72,
          2578.0,
          698,
          1381,
          0.505,
          186,
          481,
          0.387,
          447,
          498,
          0.898,
          45,
          544,
          589,
          361,
          69,
          85,
          250,
          137,
          2029
        ],
        [
          201142,
          "2016-17",
          "00",
          1610612744,
          "GSW",
          28.0,
          62,
          62,
          2070.0,
          551,
          1026,
          0.537,
          117,
          312,
          0.375,
          336,
          384,
          0.875,
          39,
          474,
          513,
          300,
          66,
          99,
          138,
          117,
          1555
        ],
        [
          201142,
          "2017-18",
          "00",
          1610612744,
          "GSW",
          29.0,
          68,
          68,
          2325.0,
          630,
          1222,
          0.516,
          173,
          413,
          0.419,
          359,
          404,
          0.889,
          31,
          433,
          464,
          366,
          50,
          119,
          207,
          133,
          1792
        ],
        [
          201142,
          "2018-19",
          "00",
          1610612744,
          "GSW",
          30.0,
          78,
          78,
          2702.0,
          721,
          1383,
          0.521,
          137,
          388,
          0.353,
          448,
          506,
          0.885,
          33,
          464,
          497,
          457,
          58,
          84,
          225,
          155,
          2027
        ],
        [
          201142,
          "2020-21",
          "00",
          1610612751,
          "BKN",
          32.0,
          35,
          32,
          1157.0,
          324,
          603,
          0.537,
          85,
          189,
          0.45,
          210,
          238,
          0.882,
          13,
          234,
          247,
          195,
          25,
          45,
          120,
          70,
          943
        ],
        [
          201142,
          "2021-22",
          "00",
          1610612751,
          "BKN",
          33.0,
          55,
          55,
          2047.0,
          578,
          1115,
          0.518,
          115,
          300,
          0.383,
          372,
          409,
          0.91,
          29,
          378,
          407,
          351,
          48,
          52,
          191,
          113,
          1643
        ],
        [
          201142,
          "2022-23",
          "00",
          1610612751,
          "BKN",
          34.0,
          39,
          39,
          1403.0,
          410,
          734,
          0.559,
          71,
          189,
          0.376,
          267,
          286,
          0.934,
          14,
          248,
          262,
          207,
          32,
          57,
          136,
          92,
          1158
        ],
        [
          201142,
          "2022-23",
          "00",
          1610612756,
          "PHX",
          34.0,
          8,
          8,
          269.0,
          73,
          128,
          0.57,
          22,
          41,
          0.537,
          40,
          48,
          0.833,
          3,
          48,
          51,
          28,
          2,
          10,
          20,
          7,
          208
        ],
        [
          201142,
          "2022-23",
          "00",
          0,
          "TOT",
          34.0,
          47,
          47,
          1672.0,
          483,
          862,
          0.56,
          93,
          230,
          0.404,
          307,
          334,
          0.919,
          17,
          296,
          313,
          235,
          34,
          67,
          156,
          99,
          1366
        ],
        [
          201142,
          "2023-24",
          "00",
          1610612756,
          "PHX",
          35.0,
          19,
          19,
          697.0,
          202,
          388,
          0.521,
          44,
          88,
          0.5,
          141,
          158,
          0.892,
          5,
          118,
          123,
          108,
          14,
          23,
          69,
          37,
          589
        ]
      ],
      "headers": [
        "PLAYER_ID",
        "SEASON_ID", // 1
        "LEAGUE_ID",
        "TEAM_ID",
        "TEAM_ABBREVIATION",
        "PLAYER_AGE", // 5
        "GP",
        "GS",
        "MIN", // 8
        "FGM",
        "FGA",
        "FG_PCT",
        "FG3M", // 12
        "FG3A",
        "FG3_PCT",
        "FTM", // 15
        "FTA",
        "FT_PCT",
        "OREB", // 18
        "DREB",
        "REB",
        "AST", // 21
        "STL",
        "BLK",
        "TOV",
        "PF",
        "PTS"
      ]
    }
  }

type TeamId = string
type SeasonId = string

type PlayerSeasonTeamStats = {
    teamId: TeamId
    age: number
    gamesPlayed: number
    gamesStarted: number
    minutes: number
    fieldGoalsMade: number
    fieldGoalsAttempted: number
    threePointersMade: number
    threePointersAttempted: number
    freeThrowsMade: number
    freeThrowsAttempted: number
    offensiveRebounds: number
    defensiveRebounds: number
    assists: number
    steals: number
    blocks: number
    turnovers: number
    personalFouls: number
}

type PlayerCareerStats = {
    regularSeasons: Record<SeasonId, [PlayerSeasonTeamStats]>
    //postSeasons: Record<SeasonId, PlayerSeasonTeamStats>
}

function generatePlayerSeasonTeamStats(rawStats: any): PlayerSeasonTeamStats {
    return {
        teamId: rawStats[3],
        age: rawStats[5],
        gamesPlayed: rawStats[6],
        gamesStarted: rawStats[7],
        minutes: rawStats[8],
        fieldGoalsMade: rawStats[9],
        fieldGoalsAttempted: rawStats[10],
        threePointersMade: rawStats[12],
        threePointersAttempted: rawStats[13],
        freeThrowsMade: rawStats[15],
        freeThrowsAttempted: rawStats[16],
        offensiveRebounds: rawStats[18],
        defensiveRebounds: rawStats[19],
        assists: rawStats[21],
        steals: rawStats[22],
        blocks: rawStats[23],
        turnovers: rawStats[24],
        personalFouls: rawStats[25]
    }
}

function generateStatsSheet(rawStats: any): PlayerCareerStats {
    const stats: PlayerCareerStats = {
        regularSeasons: {},
        //postSeasons: {}
    }

    rawStats.regular_season.data.forEach((stat: any) => {
        if (stat[4] === 'TOT') return

        const seasonId = stat[1]

        const sheet = generatePlayerSeasonTeamStats(stat)

        if (seasonId in stats.regularSeasons) stats.regularSeasons[seasonId].push(sheet)
        else stats.regularSeasons[seasonId] = [sheet]
    })

    return stats
}

const stats = generateStatsSheet(kevinDurantStats).regularSeasons

const gamesPlayed = Object.keys(stats).map(season => {
    return stats[season].map(stat => {
        return stat.gamesPlayed
    }).reduce((previous, current) => {
        return previous + current
    })
}).reduce((previous, current) => {
    return previous + current
})