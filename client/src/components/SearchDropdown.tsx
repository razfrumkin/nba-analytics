import { useState } from 'react'
import usePlayers from '../hooks/usePlayers'
import useTeams from '../hooks/useTeams'
import { PlayersFilterMode, TeamsFilterMode } from '../requests'
import useSearch from '../hooks/useSearch'
import { Form } from 'react-bootstrap'
import TeamPanel from './TeamPanel'
import PlayerPanel from './PlayerPanel'
import Team from '../models/team'
import Player from '../models/player'

interface SearchDropdownProps {
    teamsFilterMode: TeamsFilterMode
    playersFilterMode: PlayersFilterMode
    onSelected: (data: Team | Player) => void
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ teamsFilterMode, playersFilterMode, onSelected }) => {
    const teams = useTeams()
    const players = usePlayers()

    const [prompt, setPrompt] = useState<string>('')
    const { isLoading, results } = useSearch(prompt, teamsFilterMode, playersFilterMode)

    const select = (data: Team | Player) => {
        setPrompt('')
        onSelected(data)
    }

    const renderResults = () => {
        if (prompt.length === 0) return <></>
        if (Object.keys(teams).length === 0 || Object.keys(players).length === 0 || isLoading) return <span>Loading...</span>

        const items: JSX.Element[] = []
        
        results.teamsIds.forEach(id => {
            items.push(
                <TeamPanel key={id} team={teams[id]} onClick={() => select(teams[id])}/>
            )
        })

        results.playersIds.forEach(id => {
            items.push(
                <PlayerPanel key={id} player={players[id]} onClick={() => select(players[id])}/>
            )
        })

        return (
            <div className="results" style={{
                position: 'absolute',
                zIndex: 1000,
                background: 'white',
                border: '1px solid #ccc',
                boxShadow: '0 2p 5px rgba(0, 0, 0, 0.2)',
                maxHeight: '1000%',
                overflowY: 'auto',
                minWidth: '100%'
            }}>
                {items}
            </div>
        )
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Form.Control
                placeholder="Search..."
                value={prompt}
                onChange={event => setPrompt(event.target.value)}
                style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1cqw'
                }}
            />
            <div style={{ width: '100%' }}>
                {renderResults()}
            </div>
        </div>
    )
}

export default SearchDropdown