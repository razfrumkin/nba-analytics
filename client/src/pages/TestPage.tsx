import { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import Team from '../models/team'
import Player from '../models/player'
import mockStats from '../mock'
import { generatePlayerCareerStats } from '../models/playerCareerStats';

const stats = generatePlayerCareerStats(mockStats[201142])

const TestPage = () => {
    console.log(stats)
    console.log(stats.getTotal3PM('regularSeason'))

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ width: '300px' }}>
                Test
            </div>
        </div>
    )
}

export default TestPage