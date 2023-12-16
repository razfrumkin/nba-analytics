import './styles/PlayerPanel.css'
import Player from '../models/player'

interface PlayerPanelProps {
    player: Player
    onClick: () => void
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ player, onClick }) => {
    // TODO: some headshots don't exists so create a replacement alt image
    return (
        <div className="d-flex align-items-center p-1 gap-1 player-panel" onClick={onClick}>
            <img className="rounded-circle" style={{ width: '50px', aspectRatio: 1, objectFit: 'cover', objectPosition: 'center' }} 
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
            alt={`${player.firstName[0]}${player.lastName[0]}`}
            loading="lazy"
            onError={event => event.preventDefault()}></img>

            <span style={{ fontSize: '1cqw', marginLeft: '1.5%' }}>{player.fullName}</span>
        </div>
    )
}

export default PlayerPanel