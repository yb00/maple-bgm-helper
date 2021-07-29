import React, { useEffect, useState } from 'react'

import MusicSelectTable from '../components/MusicSelectTable'
import { IMusicRecordJson } from '../models/DataModel'

import './HomePage.css'

const HomePage: React.FC<{initialPlaylist?: IMusicRecordJson[]}> = ({initialPlaylist = []}) => {
    const [playlist, setPlaylist] = useState(initialPlaylist)

    return (
        <div className="home">
            <p>Please select from below:</p>
            <MusicSelectTable query="test" />
        </div>
    )
}

export default HomePage
