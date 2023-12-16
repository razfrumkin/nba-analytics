import { useContext, useEffect } from 'react'
import Player from '../models/player'
import PlayerId from '../models/playerId'
import { getPlayers } from '../requests'
import { WebsiteContext } from '../context'

const usePlayers = (): { [playerId: PlayerId]: Player } => {
    const context = useContext(WebsiteContext)
    if (!context) throw new Error('usePlayers must be used within WebsiteContextProvider')

    useEffect(() => {
        const fetchPlayers = async() => {
            console.log('Fetching players')

            getPlayers().then(response => {
                const data = response.data

                const collection: { [playerId: PlayerId]: Player } = {}
                data.forEach((player: any) => {
                    collection[player.id] = {
                        id: player.id,
                        firstName: player.first_name,
                        lastName: player.last_name,
                        fullName: player.full_name,
                        isActive: player.is_active
                    }
                })

                context.setPlayers(collection)
            }).catch(error => {
                console.error('Error fetching players:', error)
            })
        }

        if (Object.keys(context.players).length === 0) fetchPlayers()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return context.players
}

export default usePlayers