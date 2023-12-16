import TeamId from './teamId'

type Team = {
    id: TeamId
    abbreviation: string
    nickname: string
    fullName: string
    city: string
    state: string
    yearFounded: number
}

export default Team