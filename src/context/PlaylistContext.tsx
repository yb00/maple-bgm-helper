import React from 'react';
import { IPlaylist } from '../models/PlaylistModel';

type State = IPlaylist[];
type PlaylistProviderProps = { children: React.ReactNode };

const PlaylistStateContext = React.createContext<State | undefined>(undefined);

export const PlaylistProvider: ({
    children,
}: PlaylistProviderProps) => React.ReactElement = ({ children }) => {
    const [state, setState] = React.useState<State>([]);

    return (
        <PlaylistStateContext.Provider value={state}>
            {children}
        </PlaylistStateContext.Provider>
    );
};

export const usePlaylistState: () => State = () => {
    const context = React.useContext(PlaylistStateContext);
    if (!context) {
        throw new Error(
            'usePlaylistState must be used within a PlaylistProvider'
        );
    }
    return context;
};
