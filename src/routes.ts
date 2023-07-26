import { FastifyInstance } from "fastify"
import { PlexPayload } from "./types"
import { WebClient } from "@slack/web-api"
import multer from "fastify-multer"
import { notifySlack } from "./slack"
const upload = multer({storage: multer.memoryStorage()})
import { formatMovieTitle, formatTVTitle } from "./plex"

export default async function routes(
    fastify: FastifyInstance,
    options: {
        slack: WebClient
    }
) {
    const {slack} = options
    fastify.post<{
        Body: {
            payload: string
        }
    }>(
        '/plex-webhook',
        { 
            preHandler: upload.single('thumb'), 
        },
        async (request, reply): Promise<void> => {
            const payload: PlexPayload = JSON.parse(request.body.payload)
            console.log(payload)

            const isVideo = ['movie', 'episode', 'season'].includes(payload.Metadata.type)
            const isTV = ['episode', 'season'].includes(payload.Metadata.type)
            const isAudio = payload.Metadata.type === 'track'

            if (!payload.user || !payload.Metadata || !(isAudio || isVideo)) {
                return reply.send(400)
            }

            const user = payload.Account.title
            const player = payload.Player.title
            const server = payload.Server.title
            const rating = payload.Metadata.rating
            const eventType = payload.event

            let message = `${user} `
            switch(eventType) {
                case 'media.pause':
                    message += `paused`
                break
                case 'media.play':
                    message += `played`
                break
                case 'media.rate':
                    message += `rated`
                break
                case 'media.resume':
                    message += `resumed`
                break
                case 'media.stop':
                    message += `stopped`
                break
                case 'media.scrobble':
                    message += `finished watching`
                break
                default: 
                    console.log(`Event Type: ${eventType} is not supported.`)
                    return reply.send(400)
            }
            if (isTV) {
                message += ` ${formatTVTitle(payload.Metadata)}`
            } else {
                message += ` ${formatMovieTitle(payload.Metadata)}`
            }

            if (eventType === 'media.rate' && rating > 0) {
                let stars = ``
                for(let i = 0;i < rating / 2;i++) {
                    stars += `:star:`
                }
                message += `${isTV ? '\n' : ''} ${stars}`
            }

            const footer = `${eventType} by ${user} on ${player} from ${server}.`

            notifySlack(slack, {
                text: message,
                footer
            })
            return reply.send(200)
        }
    )
}
