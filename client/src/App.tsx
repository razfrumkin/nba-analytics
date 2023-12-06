import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BarChartPage from './pages/BarChartPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/bar-chart' element={<BarChartPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App