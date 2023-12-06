import { useEffect, useState } from 'react'
import { getTeams } from '../requests'

const useTeams = (): any[] => {
    const [hasFetched, setHasFetched] = useState<boolean>(false)
    const [teams, setTeams] = useState<any[]>([])

    useEffect(() => {
        const fetchTeams = async() => {
            getTeams().then(response => {
                const data = response.data

                setTeams(data)
                setHasFetched(true)
            }).catch(error => {
                console.error('Error fetching teams:', error)
            })
        }

        if (!hasFetched) fetchTeams()
    }, [hasFetched])

    return teams
}

export default useTeams