import React, {
    createContext,
    Dispatch,
    ReactNode,
    ReactElement,
    useState,
    SetStateAction
} from 'react';
import { IPlaylist, PlaylistEmpty } from '../models/PlaylistModel';

const DEFAULT_VALUE = {
    state: PlaylistEmpty(),
    setState: () => {},
};

type PlaylistContext = {
    state: IPlaylist,
    setState: Dispatch<SetStateAction<IPlaylist>>
}

type PlaylistProviderProps = { children: ReactNode };

const PlaylistStateContext = createContext<PlaylistContext>(
    DEFAULT_VALUE
);

export const PlaylistProvider: ({
    children,
}: PlaylistProviderProps) => ReactElement = ({ children }) => {
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return (
        <PlaylistStateContext.Provider value={{ state, setState }}>
            {children}
        </PlaylistStateContext.Provider>
    );
};

export const usePlaylistState: () => PlaylistContext = () => {
    const context = React.useContext(PlaylistStateContext);
    if (!context) {
        throw new Error(
            'usePlaylistState must be used within a PlaylistProvider'
        );
    }
    return context;
};
