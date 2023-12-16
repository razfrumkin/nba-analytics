import { useContext, useEffect } from 'react'
import PlayerId from '../models/playerId'
import PlayerCareerStats, { generatePlayerCareerStats } from '../models/playerCareerStats'
import { getPlayerCareerStats } from '../requests'
import { WebsiteContext } from '../context'

const usePlayersCareerStats = (playerIds: PlayerId[]): Record<PlayerId, PlayerCareerStats> => {
    const context = useContext(WebsiteContext)
    if (!context) throw new Error('usePlayersCareerStats must be used within WebsiteContextProvider')

    useEffect(() => {
        const fetchPlayers = async(ids: PlayerId[]) => {
            const data = await Promise.all(ids.map(async (id) => {
                if (context.playersCareerStats[id]) return context.playersCareerStats[id]

                console.log('Fetching player career stats with id: ', id)

                try {
                    const response = await getPlayerCareerStats(id)
                    const data = generatePlayerCareerStats(response.data)
                    return { [id]: data }
                } catch (error) {
                    console.error('Error fetching players:', error);
                    return { [id]: {} }; // TODO: change this
                }
            }))

            const newData = Object.assign({}, ...data);
            context.setPlayersCareerStats({ ...context.playersCareerStats, ...newData })
        }
        
        const unfetchedIds = playerIds.filter(id => {
            return !context.playersCareerStats[id]
        })

        if (unfetchedIds.length > 0) fetchPlayers(unfetchedIds)
    }, [playerIds, context])

    return context.playersCareerStats
}

export default usePlayersCareerStats