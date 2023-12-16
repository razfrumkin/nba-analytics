import axios from 'axios'
import PlayerId from './models/playerId'

const PORT = 8000
const URL = `http://127.0.0.1:${PORT}/endpoints`

export async function getTeams(): Promise<any> {
    return axios.get(`${URL}/teams`)
}

export async function getPlayers(): Promise<any> {
    return axios.get(`${URL}/players`)
}

export type TeamsFilterMode = 'none' | 'all'
export type PlayersFilterMode = 'none' | 'activeOnly' | 'all'

export async function getSearchResults(prompt: string, teamsFilterMode: TeamsFilterMode = 'none', playersFilterMode: PlayersFilterMode = 'none'): Promise<any> {
    return axios.get(`${URL}/search?prompt=${prompt}&teamsFilterMode=${teamsFilterMode}&playersFilterMode=${playersFilterMode}`)
}

export async function getPlayerCareerStats(playerId: PlayerId): Promise<any> {
    return axios.get(`${URL}/career-stats?playerId=${playerId}`)
}