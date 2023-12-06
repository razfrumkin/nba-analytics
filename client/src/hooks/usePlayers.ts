import { useEffect, useState } from 'react'
import { getPlayers } from '../requests'

const usePlayers = (): any[] => {
    const [hasFetched, setHasFetched] = useState<boolean>(false)
    const [players, setPlayers] = useState<any[]>([])

    useEffect(() => {
        const fetchPlayers = async() => {
            getPlayers().then(response => {
                const data = response.data

                setPlayers(data)
                setHasFetched(true)
            }).catch(error => {
                console.error('Error fetching players:', error)
            })
        }

        if (!hasFetched) fetchPlayers()
    }, [hasFetched])

    return players
}

export default usePlayers