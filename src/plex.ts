import { Metadata, PlexPayload } from "./types"

export type MappedDefaultData = {
    user: string
    player: string
    status: string
}

export const mapDefaultData = (payload: PlexPayload): MappedDefaultData => {
    const user = payload.Account.title
    const player = payload.Player.title
    const rating = payload.Metadata.rating
    const eventType = payload.event

    let status: string
    switch(eventType) {
        case 'media.pause':
            status = `Paused`
        break
        case 'media.play':
            status = `Playing`
        break
        case 'media.rate':
            let stars = ``
            for(let i = 0;i < rating / 2;i++) {
                stars += `:star:`
            }
            status = `Rated ${stars}`
        break
        case 'media.resume':
            status = `Resumed`
        break
        case 'media.stop':
            status = `Stopped`
        break
        case 'media.scrobble':
            status = `Finished Watching`
        break
        default: 
            console.log(`Event Type: ${eventType} is not supported.`)
            throw new Error(`Event Type: ${eventType} is not suupported.`)
    }

    return {
        user,
        player,
        status
    }
}

export type MappedMovieData = {
    title: string
    year: number
}

export const mapMovieData  = (metadata: Metadata): MappedMovieData => {
    return {
        title: metadata.title,
        year: metadata.year
    }
}

export type MappedTvData = {
    show: string
    season: string
    episodeNumber: number
    title: string
    year: number
}

export const mapTvData = (metadata: Metadata): MappedTvData => {
    return {
        show: metadata.grandparentTitle,
        season: metadata.parentTitle,
        episodeNumber: metadata.index,
        title: metadata.title,
        year: metadata.year
    }
}
