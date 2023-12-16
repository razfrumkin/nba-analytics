import './styles/TeamPanel.css'
import React from 'react'
import Team from '../models/team'

interface TeamPanelProps {
    team: Team
    onClick: () => void
}

const TeamPanel: React.FC<TeamPanelProps> = ({ team, onClick }) => {
    return (
        <div className="d-flex align-items-center p-1 gap-1 team-panel" onClick={onClick}>
            <img className="rounded-circle" style={{ width: '50px', aspectRatio: 1, objectFit: 'cover', objectPosition: 'center' }} src={`https://cdn.nba.com/logos/nba/${team.id}/global/D/logo.svg`} loading="lazy"></img>
            <span style={{ fontSize: '1cqw', marginLeft: '1.5%' }}>{team.fullName}</span>
        </div>
    )
}

export default TeamPanel