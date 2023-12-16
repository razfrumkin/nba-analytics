import { useState } from 'react'
import PlayerId from './models/playerId'
import PlayerCareerStats from './models/playerCareerStats'
import { WebsiteContext, WebsiteContextType } from './context'
import Player from './models/player'
import TeamId from './models/teamId'
import Team from './models/team'

const WebsiteContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [teams, setTeams] = useState<{ [teamId: TeamId]: Team }>({})
    const [players, setPlayers] = useState<{ [playerId: PlayerId]: Player }>({})

    const [playersCareerStats, setPlayersCareerStats] = useState<{ [playerId: PlayerId]: PlayerCareerStats }>({})

    const value: WebsiteContextType = {
        teams: teams,
        setTeams: setTeams,
        players: players,
        setPlayers: setPlayers,
        playersCareerStats: playersCareerStats,
        setPlayersCareerStats: setPlayersCareerStats
    }

    return (
        <WebsiteContext.Provider value={value}>
            {children}
        </WebsiteContext.Provider>
    )
}

export default WebsiteContextProvider