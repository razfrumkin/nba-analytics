import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BarChartPage from './pages/BarChartPage'
import WebsiteContextProvider from './WebsiteContextProvider'
import TestPage from './pages/TestPage'

const App = () => {
    return (
        <WebsiteContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/bar-chart' element={<BarChartPage/>}/>

                    <Route path='/test' element={<TestPage/>}/>
                </Routes>
            </BrowserRouter>
        </WebsiteContextProvider>
    )
}

export default App