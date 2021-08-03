import React, { useEffect, useState } from 'react'

import MusicSelectTable from '../components/MusicSelectTable'
import { PlaylistProvider } from '../context/PlaylistContext'
import { IMusicRecordJson } from '../models/DataModel'

import './HomePage.css'

const HomePage: React.FC<{initialPlaylist?: IMusicRecordJson[]}> = ({initialPlaylist = []}) => {
    const [playlist, setPlaylist] = useState(initialPlaylist)

    return (
        <div className="home">
            <p>Please select from below:</p>
            <PlaylistProvider>
                <MusicSelectTable query="test" />
            </PlaylistProvider>
        </div>
    )
}

export default HomePage
