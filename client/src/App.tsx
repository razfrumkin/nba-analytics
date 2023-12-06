import { useEffect } from 'react'
import useTeams from './hooks/useTeams'
import usePlayers from './hooks/usePlayers'

const App = () => {
    const teams = useTeams()
    const players = usePlayers()

    useEffect(() => {
        console.log(players)
    }, [players])

    return (
        <div>
            <p>{JSON.stringify(teams)}</p>
            <p>{JSON.stringify(players)}</p>
        </div>
    )
}

export default App