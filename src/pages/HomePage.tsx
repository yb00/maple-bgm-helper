import React, { useEffect, useState } from 'react';

import MusicSelectTable from '../components/MusicSelectTable';
import MusicResults from '../components/MusicResults';
import { PlaylistProvider } from '../context/PlaylistContext';
import { IMusicRecordJson } from '../models/DataModel';

import './HomePage.scss';

const HomePage: React.FC<{ initialPlaylist?: IMusicRecordJson[] }> = ({
    initialPlaylist = [],
}) => {
    const [playlist, setPlaylist] = useState(initialPlaylist);

    return (
        <div className="home">
            <PlaylistProvider>
                <div className="playlist">
                    <div className="select--text">
                        <p>Please select from below:</p>
                    </div>
                    <div className="select">
                        <MusicSelectTable />
                    </div>
                    <div className="results--text">
                        <p>Your results:</p>
                    </div>
                    <div className="results">
                        <MusicResults />
                    </div>
                </div>
            </PlaylistProvider>
        </div>
    );
};

export default HomePage;
