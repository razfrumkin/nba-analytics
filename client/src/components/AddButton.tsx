import { Button } from 'react-bootstrap'
import { PlayersFilterMode, TeamsFilterMode } from '../requests'
import SearchDropdown from './SearchDropdown'
import { useState } from 'react'
import Team from '../models/team'
import Player from '../models/player'

interface AddButtonProps {
    teamsFilterMode: TeamsFilterMode
    playersFilterMode: PlayersFilterMode
    onAdded: (data: Team | Player) => void
}

const AddButton: React.FC<AddButtonProps> = ({ teamsFilterMode, playersFilterMode, onAdded }) => {
    const [isIdle, setIsIdle] = useState<boolean>(true)

    const add = (data: Team | Player) => {
        setIsIdle(true)

        onAdded(data)
    }

    const content = () => {
        if (isIdle) return (
            <div className="d-flex justify-content-center align-items-center">
                <Button variant="secondary" size="lg" onClick={() => setIsIdle(false)}>Add</Button>
            </div>
        )

        return (
            <SearchDropdown teamsFilterMode={teamsFilterMode} playersFilterMode={playersFilterMode} onSelected={add}/>
        )
    }

    return content()
}

export default AddButton