import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Dropdown, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import usePlayers from '../hooks/usePlayers'
import usePlayerCareerStats from '../hooks/usePlayersCareerStats'
import AddButton from '../components/AddButton'
import PlayerId from '../models/playerId'
import Player from '../models/player'
import { useSearchParams } from 'react-router-dom'
import { Mode, Period, ReboundType, SeasonType, StatType, StatsOptions, formatReboundType, formatStatType } from '../models/playerCareerStats'
import SeasonId from '../models/seasonId'
import PlayerSeasonTeamStats from '../models/playerSeasonTeamStats'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChartPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const seasonType = searchParams.get('seasonType') as SeasonType ?? 'regularSeason'
    const period = searchParams.get('period') as Period ?? 'season'
    const seasonId = searchParams.get('seasonId') as SeasonId ?? '2023-24'
    const mode = searchParams.get('mode') as Mode ?? 'perGame'
    const statType = searchParams.get('statType') as StatType ?? StatType.Points
    const reboundType = searchParams.get('reboundType') as ReboundType ?? 'all'
    const playersIds = JSON.parse(searchParams.get('playersIds') ?? '[]') as PlayerId[]

    const handleDropDownChange = (key: keyof StatsOptions, value: string) => {
        const currentSearchParams = Object.fromEntries(searchParams.entries())
        currentSearchParams[key] = value
        setSearchParams(currentSearchParams)
    }

    const players = usePlayers()

    const playersStats = usePlayerCareerStats(playersIds)

    const availableIds = playersIds.filter(playerId => {
        return playerId in playersStats
    })

    const generateData = (): number[] => {
        const total = availableIds.map(playerId => {
            if (period === 'allTime') return [playerId, playersStats[playerId].getTotalValues(seasonType, statType as keyof PlayerSeasonTeamStats)]
            return [playerId, playersStats[playerId].getTotalValuesBySeason(seasonType, seasonId, statType as keyof PlayerSeasonTeamStats)]
        })

        if (mode === 'total') return total.map(value => {
            return value[1]
        })

        return total.map(value => {
            if (period === 'allTime') return value[1] / (playersStats[value[0]].getTotalValues(seasonType, 'gamesPlayed') || 1)
            return value[1] / (playersStats[value[0]].getTotalValuesBySeason(seasonType, seasonId, 'gamesPlayed') || 1)
        })
    }

    const addPlayer = (player: Player) => {
        if (playersIds.includes(player.id)) return

        const currentSearchParams = Object.fromEntries(searchParams.entries())

        let playersIdsParam = '['
        for (let index = 0; index < playersIds.length; index += 1) {
            playersIdsParam += `${playersIds[index]},`
        }
        playersIdsParam += `${player.id}]`

        currentSearchParams['playersIds'] = playersIdsParam
        setSearchParams(currentSearchParams)
    }

    if (Object.keys(players).length === 0) return <h1>Loading...</h1>

    const data = {
        labels: availableIds.map(playerId => {
            return players[playerId].fullName
        }),
        datasets: [{
          label: `Bar Chart`,
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
        <div className="d-flex flex-row justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column" style={{ width: '50%' }}>
                <div style={{ width: '100%' }}>
                    <Bar data={data}/>
                </div>
                <Form className="d-flex flex-row gap-2">
                    <FormGroup>
                        <FormLabel>Season Type:</FormLabel>
                        <Dropdown style={{ backgroundColor: 'transparent' }}>
                            <Dropdown.Toggle variant="none" className="btn btn-outline-dark" style={{ borderRadius: '500px' }}>
                                {seasonType === 'regularSeason' ? 'Regular Season' : 'Postseason'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDropDownChange('seasonType', 'regularSeason')}>Regular Season</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropDownChange('seasonType', 'postseason')}>Post Season</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Period:</FormLabel>
                        <Dropdown style={{ backgroundColor: 'transparent' }}>
                            <Dropdown.Toggle variant="none" className="btn btn-outline-dark" style={{ borderRadius: '500px' }}>
                                {period === 'allTime' ? 'All Time' : 'Season'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDropDownChange('period', 'allTime')}>All Time</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropDownChange('period', 'season')}>Season</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {period === 'season' && (
                            <FormControl type="text" placeholder="Enter season..." value={seasonId ?? ''} onChange={event => handleDropDownChange('season', event.target.value)}/>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Mode:</FormLabel>
                        <Dropdown style={{ backgroundColor: 'transparent' }}>
                            <Dropdown.Toggle variant="none" className="btn btn-outline-dark" style={{ borderRadius: '500px' }}>
                                {mode === 'perGame' ? 'Per Game' : 'Total'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDropDownChange('mode', 'perGame')}>Per Game</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropDownChange('mode', 'total')}>Total</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Stat:</FormLabel>
                        <Dropdown style={{ backgroundColor: 'transparent' }}>
                            <Dropdown.Toggle variant="none" className="btn btn-outline-dark" style={{ borderRadius: '500px' }}>
                                {formatStatType(statType)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {
                                    Object.values(StatType).map(value => {
                                        const statTypeKey = value as StatType
                                        return (
                                            <Dropdown.Item key={value} onClick={() => handleDropDownChange('statType', statTypeKey)}>{formatStatType(statTypeKey)}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {statType === StatType.Rebounds && (
                            <>
                                <FormLabel>Rebound Type:</FormLabel>
                                <Dropdown style={{ backgroundColor: 'transparent' }}>
                                    <Dropdown.Toggle variant="none" className="btn btn-outline-dark" style={{ borderRadius: '500px' }}>
                                        {formatReboundType(reboundType)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {
                                            Object.values(ReboundType).map(value => {
                                                const reboundTypeKey = value as ReboundType
                                                return (
                                                    <Dropdown.Item key={value} onClick={() => handleDropDownChange('reboundType', reboundTypeKey)}>{formatReboundType(reboundTypeKey)}</Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </FormGroup>
                </Form>

                <AddButton teamsFilterMode="all" playersFilterMode="activeOnly" onAdded={data => addPlayer(data as Player)}></AddButton>
            </div>
        </div>
    )
}

export default BarChartPage