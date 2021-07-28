import React, { useEffect, useState } from 'react'

import MusicSelectTable from '../components/MusicSelectTable'

import './HomePage.css'

const HomePage = () => {
    const [bgm, setBgm] = useState([])

    return (
        <div className="home">
            <p>Please select from below:</p>
            <MusicSelectTable query="test" />
        </div>
    )
}

export default HomePage
