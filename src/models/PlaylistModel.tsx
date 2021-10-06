import { IMusicRecordJson } from './DataModel';

export interface IPlaylistItem extends IMusicRecordJson {
    id: Number;
}

export interface IPlaylist {
    items: IPlaylistItem[];
}

export const PlaylistEmpty = (): IPlaylist => ({
    items: [
        {
            id: 0,
            description: '',
            filename: '',
            mark: '',
            source: {
                client: '',
                date: '',
                structure: '',
                version: ''
            },
            youtube: '',
            metadata: {
                albumArtist: '',
                artist: '',
                subtitle: '',
                title: '',
                year: '',
            },
        },
    ],
});
