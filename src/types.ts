export interface Account {
    id: number
    thumb: string
    title: string
}

export interface Server {
    title: string
    uuid: string
}

export interface Player {
    local: boolean
    publicAddress: string
    title: string
    uuid: string
}

export interface ExtraMetadata {
    id: number
    filter: string
    tag: string
    count?: number
}

export interface Guid {
    id: string
}

export interface Role extends ExtraMetadata {
    role: string
    thumb: string
}

export interface Metadata {
    librarySectionType: string
    ratingKey: string
    key: string
    guid: string
    studio: string
    type: string
    title: string
    titleSort: string
    grandparentKey: string
    grandparentTitle: string
    parentTitle: string
    librarySectionTitle: string
    librarySectionID: number
    librarySectionKey: string
    contentRating: string
    summary: string
    rating: number
    audienceRating: number
    viewOffset: number
    lastViewedAt: number
    year: number
    tagline: string
    thumb: string
    art: string
    duration: number
    originallyAvailableAt: string
    addedAt: number
    updatedAt: number
    audienceRatingImage: string
    primaryExtraKey: string
    ratingImage: string
    ratingCount: number
    parentKey: string
    index: number
    parentIndex: number
    Genre: ExtraMetadata[]
    Director: ExtraMetadata[]
    Writer: ExtraMetadata[]
    Producer: ExtraMetadata[]
    Country: ExtraMetadata[]
    Guid: Guid[]
    Role: Role[]
}

export type PlaybackEventTypes =
    | "media.play" // Media starts playing. An appropriate poster is attached.
    | "media.pause" // Media playback pauses.
    | "media.rate" // Media is rated. A poster is also attached to this event.
    | "media.resume" // Media playback resumes.
    | "media.scrobble" // Media is viewed (playe past the 90% mark.)
    | "media.stop" // Media playback stops.

export type NewContentEventTypes = 
    | "library.on.deck" // A new item is added that appears in the user's On Deck. A poster is also attached to this event.
    | "library.new" // A new item is added to a library to which the user has access. A poster is also attached to this event.

export type ServerOwnerEventTypes = 
    | "admin.database.backup" // A database backup is completed successfully.
    | "admin.database.corrupted" // Corruption is detected in the server database.
    | "device.new" // A device accesses the owern's server for any reason, which may come from background connection testing and doesn't necessarily indicate active browsing or playback.
    | "playback.started" // Playback is started by a shared user for the server. A poster is also attached to this event.

export interface PlexPayload {
    event: PlaybackEventTypes | NewContentEventTypes | ServerOwnerEventTypes
    user: boolean
    owner: boolean
    Account: Account
    Server: Server
    Player: Player
    Metadata: Metadata
}
