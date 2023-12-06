import axios from 'axios'

const PORT = 8000
const URL = `http://127.0.0.1:${PORT}/endpoints`

export async function getTeams(): Promise<any> {
    return axios.get(`${URL}/teams`)
}

export async function getPlayers(): Promise<any> {
    return axios.get(`${URL}/players`)
}