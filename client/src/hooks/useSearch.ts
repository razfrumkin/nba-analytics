import { useEffect, useState } from 'react'
import PlayerId from '../models/playerId'
import TeamId from '../models/teamId'
import { PlayersFilterMode, TeamsFilterMode, getSearchResults } from '../requests'

const useSearch = (prompt: string, teamsFilterMode: TeamsFilterMode = 'none', playersFilterMode: PlayersFilterMode = 'none'): { isLoading: boolean, results: { teamsIds: TeamId[], playersIds: PlayerId[] } } => {
    const [loaded, setLoaded] = useState<boolean>(true)
    const [results, setResults] = useState<{ teamsIds: TeamId[], playersIds: PlayerId[] }>({ teamsIds: [], playersIds: [] })

    useEffect(() => {
        if (prompt.length === 0) return

        const promptCopy = prompt // create a copy of the previous state

        setLoaded(false)

        getSearchResults(prompt, teamsFilterMode, playersFilterMode).then(response => {
            const data = response.data

            if (prompt !== promptCopy) return // ensure that the latest state would affect the right results
            setResults({ teamsIds: data.teams_ids, playersIds: data.players_ids })
        }).catch(error => {
            console.error('Error fetching search results:', error)
        }).finally(() => {
            setLoaded(true)
        })
    }, [prompt, teamsFilterMode, playersFilterMode])

    return { isLoading: !loaded, results: results }
}

export default useSearch