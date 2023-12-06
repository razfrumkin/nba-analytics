import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
    const [message, setMessage] = useState<string>('Loading...')

    useEffect(() => {
        console.log('Retreiving message...')

        axios.get('http://127.0.0.1:8000/message').then(json => {
            setMessage(json.data.message)
        })
    }, [])

    return (
        <h1>{message}</h1>
    )
}

export default App