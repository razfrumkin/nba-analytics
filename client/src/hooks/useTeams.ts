import { useContext, useEffect } from 'react'
import { getTeams } from '../requests'
import { WebsiteContext } from '../context'
import Team from '../models/team'
import TeamId from '../models/teamId'

const useTeams = (): { [teamId: TeamId]: Team } => {
    const context = useContext(WebsiteContext)
    if (!context) throw new Error('useTeams must be used within WebsiteContextProvider')

    useEffect(() => {
        const fetchTeams = async() => {
            console.log('Fetching teams')

            getTeams().then(response => {
                const data = response.data

                const collection: { [teamId: TeamId]: Team } = {}
                data.forEach((team: any) => {
                    collection[team.id] = {
                        id: team.id,
                        abbreviation: team.abbreviation,
                        nickname: team.nickname,
                        fullName: team.full_name,
                        city: team.city,
                        state: team.state,
                        yearFounded: team.year_founded
                    }
                })

                context.setTeams(collection)
            }).catch(error => {
                console.error('Error fetching teams:', error)
            })
        }

        if (Object.keys(context.teams).length === 0) fetchTeams()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return context.teams
}

export default useTeams