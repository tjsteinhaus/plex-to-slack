import { Metadata } from "./types"

export const formatMovieTitle = (metadata: Metadata): string => {
    if (metadata.grandparentTitle) {
        return metadata.grandparentTitle
    }

    let movieTitle = metadata.title
    if (metadata.year) {
        movieTitle += ` (${metadata.year})`
    }

    return movieTitle
}

export const formatTVTitle = (metadata: Metadata): string => {
    let episodeTitle = `
        Show: ${metadata.grandparentTitle}\n
        Season: ${metadata.parentTitle}\n
        Episode: ${metadata.index}\n
        Title: ${metadata.title}`
    if (metadata.year) {
        episodeTitle += ` (${metadata.year})`
    }

    return episodeTitle
}
