import { createContext } from 'react'
import PlayerCareerStats from './models/playerCareerStats'
import PlayerId from './models/playerId'
import Team from './models/team'
import TeamId from './models/teamId'
import Player from './models/player'

export interface WebsiteContextType {
    teams: { [teamId: TeamId]: Team }
    setTeams: React.Dispatch<React.SetStateAction<{ [teamId: TeamId]: Team }>>
    players: { [playerId: PlayerId]: Player }
    setPlayers: React.Dispatch<React.SetStateAction<{ [payerId: PlayerId]: Player }>>
    playersCareerStats: { [playerId: PlayerId]: PlayerCareerStats }
    setPlayersCareerStats: React.Dispatch<React.SetStateAction<{ [playerId: PlayerId]: PlayerCareerStats }>>
}

export const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined)